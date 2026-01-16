'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ContentRenderer } from '@/components/blog/ContentReader';
import { incrementViews, toggleLike } from '@/app/admin/blog/actions';
import { EyeIcon, HeartIcon } from 'lucide-react';
import { hasLikedPost, hasViewedPost, markPostAsViewed } from '@/utils/cookies';
import { BlogPostJsonLd } from '@/components/JsonLd/schemas';
import { Post } from '@/types';
import { useAnalytics } from '@/hooks/useAnalytics';

type Language = 'en' | 'ar';

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: encodedSlug } = use(params);
  const slug = decodeURIComponent(encodedSlug);
  const searchParams = useSearchParams();
  const { trackBlogPost, trackBlogInteraction } = useAnalytics();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const router = useRouter();
  const supabase = createClient();

  // Check URL parameter for language
  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang === 'ar') {
      setLanguage('ar');
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error || !data) {
          router.push('/404');
          return;
        }

        setPost(data as Post);

        if (!hasViewedPost(data.id)) {
          const viewed = await incrementViews(data.id);
          if (viewed) {
            markPostAsViewed(data.id);
          }
        }

        const likedPosts = document.cookie
          .split(';')
          .find((c) => c.trim().startsWith('liked_posts='));

        if (likedPosts) {
          const likedPostIds = likedPosts.split('=')[1].split(',');
          setHasLiked(likedPostIds.includes(data.id));
        }

        setHasLiked(hasLikedPost(data.id));

        if (data.cover_image) {
          if (data.cover_image.startsWith('http')) {
            setCoverImageUrl(data.cover_image);
          } else {
            const {
              data: { publicUrl },
            } = supabase.storage
              .from('blog-content')
              .getPublicUrl(data.cover_image);
            setCoverImageUrl(publicUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, supabase, router]);

  useEffect(() => {
    if (post) {
      trackBlogPost({
        title: post.title,
        slug: post.slug,
        tags: post.tags,
      });
    }
  }, [post, trackBlogPost]);

  const handleLike = async () => {
    if (!post || isLiking || hasLiked) return;

    setIsLiking(true);
    try {
      const result = await toggleLike(post.id);

      if (result.error) {
        console.error('Like error:', result.error);
        return;
      }

      if (result.success) {
        setPost((prev) =>
          prev
            ? {
                ...prev,
                likes_count: result.likes,
              }
            : null
        );
        setHasLiked(true);
        trackBlogInteraction('like', post.slug);
      }
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setIsLiking(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" />
          <p className="text-slate-900 text-base font-semibold">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-3">
          <div className="text-red-600 text-2xl font-bold">Post not found</div>
          <p className="text-slate-800">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // Get content based on selected language with fallback
  const currentTitle =
    language === 'ar' && post.title_ar
      ? post.title_ar
      : post.title_en || post.title;
  const currentDescription =
    language === 'ar' && post.description_ar
      ? post.description_ar
      : post.description_en || post.description;
  const currentContent =
    language === 'ar' && post.content_ar
      ? post.content_ar
      : post.content_en || post.content;

  const formattedContent =
    typeof currentContent === 'string'
      ? JSON.parse(currentContent)
      : currentContent;

  const hasArabic = !!(post.title_ar || post.content_ar);
  // Calculate reading time
  const calculateReadingTime = (content: any): number => {
    const getTextContent = (node: any): string => {
      if (typeof node === 'string') return node;
      if (node.text) return node.text;
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(getTextContent).join(' ');
      }
      return '';
    };

    const text = getTextContent(formattedContent);
    const wordsPerMinute = 200;
    const wordCount = text
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  const readingTime = calculateReadingTime(formattedContent);
  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    const url = new URL(window.location.href);
    if (lang === 'ar') {
      url.searchParams.set('lang', 'ar');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <article
      className="py-12 md:py-20 bg-gradient-to-b from-blue-50 via-white to-white"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <BlogPostJsonLd post={post} />

      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="space-y-6">
          {/* Language Switcher & Back Button */}
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
            >
              <svg
                className={`w-5 h-5 transform group-hover:${language === 'ar' ? 'translate-x-1' : '-translate-x-1'} transition-transform`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={language === 'ar' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
              {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Link>

            {hasArabic && (
              <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => switchLanguage('ar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    language === 'ar'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🇸🇦 العربية
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            {currentTitle}
          </h1>

          {/* Description */}
          {currentDescription && (
            <p className="text-xl text-slate-600 leading-relaxed">
              {currentDescription}
            </p>
          )}

          {/* Meta information */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y border-slate-200">
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <time className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.created_at).toLocaleDateString(
                  language === 'ar' ? 'ar-SA' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </time>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readingTime} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}
              </span>
            </div>
            <button
              onClick={handleLike}
              disabled={isLiking || hasLiked}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                hasLiked
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-200'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <HeartIcon
                className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
              />
              {post?.likes_count || 0} {hasLiked ? 'Liked' : 'Like'}
            </button>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {coverImageUrl && (
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg border border-slate-200">
              <Image
                src={coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white  border border-slate-200 p-8 md:p-12">
          <ContentRenderer content={formattedContent} />
        </div>

        {/* Share section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium">
                {language === 'ar'
                  ? 'شارك هذه المقالة:'
                  : 'Share this article:'}
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentTitle)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div> */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 !text-white font-semibold transition-colors"
            >
              Read More Articles
              <svg
                className="w-4 h-4 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
