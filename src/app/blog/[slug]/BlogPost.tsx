'use client';

import { use, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ContentRenderer } from '@/components/blog/ContentReader';
import { incrementViews, toggleLike } from '@/app/admin/blog/actions';
import { EyeIcon, HeartIcon } from 'lucide-react';
import { hasLikedPost, hasViewedPost, markPostAsViewed } from '@/utils/cookies';
import { BlogPostJsonLd } from '@/components/JsonLd/schemas';
import { Post } from '@/types';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: encodedSlug } = use(params);
  const slug = decodeURIComponent(encodedSlug);
  const { trackBlogPost, trackBlogInteraction } = useAnalytics();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();
  const supabase = createClient();

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

        if (data.cover_image && !data.cover_image.startsWith('http')) {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from('blog-content')
            .getPublicUrl(data.cover_image);
          setCoverImageUrl(publicUrl);
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

  const formattedContent =
    typeof post.content === 'string' ? JSON.parse(post.content) : post.content;

  return (
    <article className="py-12 md:py-20">
      <BlogPostJsonLd post={post} />

      {/* Hero Section */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            {post?.title}
          </h1>

          {/* Meta information */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y-2 border-slate-300">
            <div className="flex items-center gap-6 text-base text-slate-700 font-semibold">
              <time className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="flex items-center gap-2">
                <EyeIcon className="w-5 h-5" />
                {post?.views_count || 0} views
              </span>
            </div>
            <button
              onClick={handleLike}
              disabled={isLiking || hasLiked}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all ${
                hasLiked
                  ? 'bg-red-100 text-red-600 border-2 border-red-600'
                  : 'bg-slate-900 text-white hover:bg-red-600 border-2 border-slate-900 hover:border-red-600'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <HeartIcon
                className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`}
              />
              {post?.likes_count || 0}
            </button>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 border-2 border-blue-600 px-4 py-2 text-sm font-bold text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {coverImageUrl && (
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
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
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <ContentRenderer content={formattedContent} />
        </div>
      </div>
    </article>
  );
}
