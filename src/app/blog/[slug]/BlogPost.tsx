'use client';

import { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Calendar,
    Clock,
    Eye,
    Hash,
    Heart,
    Languages,
} from 'lucide-react';
import { ContentRenderer } from '@/components/blog/ContentReader';
import { incrementViews, toggleLike } from '@/app/admin/blog/actions';
import { hasLikedPost, hasViewedPost, markPostAsViewed } from '@/utils/cookies';
import { BlogPostJsonLd } from '@/components/JsonLd/schemas';
import { Post } from '@/types';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

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
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        const lang = searchParams.get('lang');
        if (lang === 'ar') setLanguage('ar');
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
                    if (viewed) markPostAsViewed(data.id);
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
            trackBlogPost({ title: post.title, slug: post.slug, tags: post.tags });
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
                    prev ? { ...prev, likes_count: result.likes } : null
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

    if (loading) return <PostLoading />;
    if (!post) return <PostNotFound />;

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
    const readingTime = calculateReadingTime(formattedContent);

    const switchLanguage = (lang: Language) => {
        setLanguage(lang);
        const url = new URL(window.location.href);
        if (lang === 'ar') url.searchParams.set('lang', 'ar');
        else url.searchParams.delete('lang');
        window.history.pushState({}, '', url.toString());
    };

    const formattedDate = new Date(post.created_at).toLocaleDateString(
        language === 'ar' ? 'ar-SA' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    return (
        <article
            className="relative py-20 md:py-28"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline" />
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-3xl" />

            <BlogPostJsonLd post={post} />

            <div className="container-dev relative max-w-4xl">
                {/* Top utility strip */}
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-signal"
                    >
                        {language === 'ar' ? (
                            <>
                                <span>{'العودة إلى المدونة'}</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </>
                        ) : (
                            <>
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                                <span>cd ../blog</span>
                            </>
                        )}
                    </Link>

                    {hasArabic && (
                        <div
                            role="group"
                            aria-label="Language"
                            className="inline-flex items-center gap-1 rounded-md border border-rule bg-paper-raised p-1"
                        >
                            <Languages className="ml-1 h-3.5 w-3.5 text-ink-faint" />
                            <button
                                onClick={() => switchLanguage('en')}
                                className={cn(
                                    'rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors',
                                    language === 'en'
                                        ? 'bg-signal text-ink-inverse'
                                        : 'text-ink-muted hover:text-ink'
                                )}
                            >
                                en
                            </button>
                            <button
                                onClick={() => switchLanguage('ar')}
                                className={cn(
                                    'rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors',
                                    language === 'ar'
                                        ? 'bg-signal text-ink-inverse'
                                        : 'text-ink-muted hover:text-ink'
                                )}
                            >
                                ar
                            </button>
                        </div>
                    )}
                </div>

                {/* Header */}
                <header className="mt-10 space-y-6">
                    <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                            {`// post / ${post.slug}`}
                        </span>
                        <span className="h-px flex-1 bg-rule" />
                    </div>

                    <h1 className="stencil text-balance text-4xl leading-[0.95] text-ink sm:text-5xl md:text-6xl">
                        {currentTitle}
                    </h1>

                    {currentDescription && (
                        <p className="max-w-3xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
                            {currentDescription}
                        </p>
                    )}

                    {/* Meta strip */}
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
                        <MetaCell
                            label="published"
                            value={formattedDate}
                            icon={<Calendar className="h-3 w-3" />}
                        />
                        <MetaCell
                            label="read"
                            value={`${readingTime} ${language === 'ar' ? 'دقيقة' : 'min'}`}
                            icon={<Clock className="h-3 w-3" />}
                        />
                        <MetaCell
                            label="views"
                            value={String(post.views_count ?? 0)}
                            icon={<Eye className="h-3 w-3" />}
                        />
                        <MetaCell
                            label="likes"
                            value={String(post.likes_count ?? 0)}
                            icon={<Heart className={cn('h-3 w-3', hasLiked && 'fill-signal text-signal')} />}
                            highlight={hasLiked}
                        />
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                                tags:
                            </span>
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center gap-1 rounded-md border border-rule bg-paper-raised px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition-colors hover:border-signal/40 hover:text-signal"
                                >
                                    <Hash className="h-3 w-3" />
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </header>

                {/* Cover image — code-window frame */}
                {coverImageUrl && (
                    <figure className="mt-10 overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-card">
                        <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                            <span className="dot-light bg-rule-strong" />
                            <span className="dot-light bg-rule-strong" />
                            <span className="dot-light bg-rule-strong" />
                            <span className="ml-2 font-mono text-xs text-ink-muted">
                                cover.{guessImageExtension(coverImageUrl)}
                            </span>
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                preview
                            </span>
                        </div>
                        <div className="relative aspect-video bg-paper-sunken">
                            <Image
                                src={coverImageUrl}
                                alt={currentTitle || post.title || 'Blog post cover image'}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1024px"
                                className="object-cover"
                            />
                        </div>
                    </figure>
                )}

                {/* Content panel */}
                <section className="mt-10 overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-card">
                    <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                        <span className="dot-light bg-rule-strong" />
                        <span className="dot-light bg-rule-strong" />
                        <span className="dot-light bg-rule-strong" />
                        <span className="ml-2 font-mono text-xs text-ink-muted">
                            article.md
                        </span>
                        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                            read-only
                        </span>
                    </div>
                    <div className="px-5 py-8 md:px-10 md:py-12">
                        <ContentRenderer content={formattedContent} />
                    </div>
                </section>

                {/* Footer / actions */}
                <div className="mt-12 grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <button
                        onClick={handleLike}
                        disabled={isLiking || hasLiked}
                        aria-pressed={hasLiked}
                        className={cn(
                            'inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all',
                            hasLiked
                                ? 'border-signal/50 bg-signal/10 text-signal'
                                : 'border-rule bg-paper-raised text-ink hover:border-signal hover:text-signal',
                            isLiking && 'cursor-not-allowed opacity-50'
                        )}
                    >
                        <Heart className={cn('h-3.5 w-3.5', hasLiked && 'fill-current')} />
                        {hasLiked
                            ? language === 'ar' ? 'تم الإعجاب' : 'liked'
                            : language === 'ar' ? 'إعجاب' : 'like post'}
                        <span className="text-ink-faint">
                            ({post.likes_count ?? 0})
                        </span>
                    </button>

                    <span className="hidden h-px bg-rule sm:block" />

                    <Link href="/blog" className="btn-ghost justify-self-end">
                        {language === 'ar' ? 'مقالات أخرى' : 'more articles'}
                        <ArrowUpRight className="h-3 w-3" />
                    </Link>
                </div>

                <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                    <span>{`// end of post`}</span>
                    <span className="h-px flex-1 bg-rule" />
                    <span>{`exit 0`}</span>
                </div>
            </div>
        </article>
    );
}

function MetaCell({
    label,
    value,
    icon,
    highlight,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <div className="bg-paper-raised px-4 py-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                {`// ${label}`}
            </p>
            <p
                className={cn(
                    'mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-ink',
                    highlight && 'text-signal'
                )}
            >
                {icon}
                <span className="truncate">{value}</span>
            </p>
        </div>
    );
}

function calculateReadingTime(content: any): number {
    const getTextContent = (node: any): string => {
        if (!node) return '';
        if (typeof node === 'string') return node;
        if (node.text) return node.text;
        if (node.content && Array.isArray(node.content)) {
            return node.content.map(getTextContent).join(' ');
        }
        return '';
    };
    const text = getTextContent(content);
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

function guessImageExtension(url: string): string {
    const m = url.split('?')[0].match(/\.([a-z0-9]+)$/i);
    return (m?.[1] || 'png').toLowerCase();
}

function PostLoading() {
    return (
        <div className="relative flex min-h-[60vh] items-center justify-center py-24">
            <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
                <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="ml-2 font-mono text-xs text-ink-muted">
                        loading
                    </span>
                </div>
                <div className="space-y-2 p-6 font-mono text-sm">
                    <div className="flex gap-3">
                        <span className="select-none text-ink-faint">{`>`}</span>
                        <span className="text-ink">fetching post...</span>
                        <span className="ml-1 inline-block h-4 w-2 animate-blink bg-signal align-middle" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostNotFound() {
    return (
        <div className="relative flex min-h-[60vh] items-center justify-center py-24">
            <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised frame-brackets">
                <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                    <span className="dot-light bg-danger/80" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="ml-2 font-mono text-xs text-ink-muted">
                        post/404
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-danger">
                        404
                    </span>
                </div>
                <div className="space-y-3 p-6 font-mono text-sm">
                    <div className="flex gap-3">
                        <span className="select-none text-ink-faint">{`>`}</span>
                        <span className="text-danger">post not found</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="select-none text-ink-faint">{`>`}</span>
                        <span className="text-ink-muted">
                            this article doesn&apos;t exist or was unpublished
                        </span>
                    </div>
                    <div className="pt-2">
                        <Link href="/blog" className="btn-ghost">
                            <ArrowLeft className="h-3 w-3" />
                            back to blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
