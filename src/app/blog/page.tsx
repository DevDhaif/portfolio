import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { ArrowUpRight, Calendar, Clock, Hash, Search, Terminal as TerminalIcon, X } from 'lucide-react';
import { BlogPageProps, Post, ProcessedPost } from '@/types';

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedParams = await searchParams;
    const tag = resolvedParams?.tag || '';
    const search = resolvedParams?.search || '';

    return (
        <section className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline" />
            <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-3xl" />

            <div className="container-dev relative">
                {/* Page anchor */}
                <header className="relative">
                    <div aria-hidden className="section-numeral select-none">
                        ##
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                            {'// ~/journal'}
                        </span>
                        <span className="h-px flex-1 bg-rule" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                            read · think · ship
                        </span>
                    </div>

                    <h1 className="stencil mt-7 text-balance text-4xl leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                        Field notes on{' '}
                        <span className="relative inline-block">
                            shipping
                            <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                        </span>{' '}
                        the web.
                    </h1>

                    <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
                        Practical write-ups on React, Next.js, TypeScript, and the
                        small details that turn a UI from working into{' '}
                        <span className="font-mono text-ink">{`<good/>`}</span>.
                    </p>
                </header>

                {/* Search + tag rail */}
                <Suspense fallback={<SearchBarSkeleton />}>
                    <SearchAndFilterBar currentTag={tag} currentSearch={search} />
                </Suspense>

                {/* Posts grid */}
                <Suspense fallback={<PostsGridSkeleton />}>
                    <PostsGrid tag={tag} search={search} />
                </Suspense>
            </div>
        </section>
    );
}

async function PostsGrid({ tag, search }: { tag: string; search: string }) {
    const supabase = await createClient();

    let query = supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: posts, error } = await query;

    if (error) {
        return <BlogError message="Failed to load blog posts" />;
    }

    if (!posts || posts.length === 0) {
        return <NoPostsFound search={search} tag={tag} />;
    }

    const processedPosts: ProcessedPost[] = posts.map((post: Post) => {
        let coverImageUrl = post.cover_image;
        if (post.cover_image && !post.cover_image.startsWith('http')) {
            coverImageUrl = supabase.storage
                .from('blog-content')
                .getPublicUrl(post.cover_image).data.publicUrl;
        }

        let processedTags: string[] = [];
        if (typeof post.tags === 'string') {
            try {
                const parsedTags = JSON.parse(post.tags);
                processedTags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
            } catch {
                processedTags = String(post.tags)
                    .replace(/[\[\]"]/g, '')
                    .split(',')
                    .map((t) => t.trim());
            }
        } else if (Array.isArray(post.tags)) {
            processedTags = post.tags;
        }

        return {
            ...post,
            cover_image: coverImageUrl,
            tags: processedTags.filter(Boolean),
        };
    });

    const filteredPosts = tag
        ? processedPosts.filter((post) =>
            post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        )
        : processedPosts;

    if (filteredPosts.length === 0) {
        return <NoPostsFound search={search} tag={tag} />;
    }

    const allTags = Array.from(
        new Set(processedPosts.flatMap((post) => post.tags))
    ).sort();

    return (
        <div className="mt-10 space-y-12">
            {/* Filter readout */}
            {tag && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-rule bg-paper-raised px-4 py-3">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                        <span className="text-ink-faint">filter</span>
                        <span className="text-ink-muted">/</span>
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-signal/40 bg-signal/10 px-2 py-1 text-signal">
                            <Hash className="h-3 w-3" />
                            {tag}
                        </span>
                        <span className="text-ink-faint">
                            ({String(filteredPosts.length).padStart(2, '0')}{' '}
                            {filteredPosts.length === 1 ? 'match' : 'matches'})
                        </span>
                    </div>
                    <Link href="/blog" className="btn-ghost py-2 text-[10px]">
                        <X className="h-3 w-3" />
                        clear filter
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                ))}
            </div>

            {/* Tag cloud */}
            {!tag && allTags.length > 0 && (
                <div className="mt-16 border-t border-rule pt-10">
                    <div className="mb-6 flex items-baseline gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                            {'// tags'}
                        </span>
                        <span className="h-px flex-1 bg-rule" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                            {String(allTags.length).padStart(2, '0')} entries
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((t) => (
                            <Link
                                key={t}
                                href={`/blog?tag=${encodeURIComponent(t)}`}
                                className="chip transition-colors hover:border-signal/40 hover:bg-signal/10 hover:text-signal"
                            >
                                <Hash className="h-3 w-3" />
                                {t}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function PostCard({ post, index }: { post: ProcessedPost; index: number }) {
    const num = String(index + 1).padStart(2, '0');
    const date = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const readMins = estimateReadingMinutes(post);

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-card-hover frame-brackets">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-rule bg-paper-sunken px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    POST_{num}
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="dot-light bg-rule-strong group-hover:bg-signal transition-colors" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                </div>
            </div>

            {/* Image */}
            <div className="relative block aspect-[16/10] overflow-hidden bg-paper-sunken" data-cursor="on">
                {post.cover_image ? (
                    <Image
                        src={post.cover_image}
                        alt={post.title || 'Blog post cover'}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-paper-sunken">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                            {'// no preview'}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-paper-raised/80 via-transparent to-transparent" />

                {post.tags && post.tags.length > 0 && (
                    <div className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-1.5">
                        {post.tags.slice(0, 2).map((t) => (
                            <span
                                key={t}
                                className="rounded-md border border-rule bg-paper/85 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-ink backdrop-blur-md"
                            >
                                {t}
                            </span>
                        ))}
                        {post.tags.length > 2 && (
                            <span className="rounded-md border border-rule bg-paper/85 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-ink-muted backdrop-blur-md">
                                +{post.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.created_at}>{date}</time>
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {readMins} min
                    </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-signal">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="before:absolute before:inset-0 before:z-0 before:content-['']"
                    >
                        {post.title}
                    </Link>
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {post.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-ink-faint">
                        {`> read post`}
                    </span>
                    <span
                        aria-hidden
                        className="inline-flex items-center gap-1 text-ink-faint transition-colors group-hover:text-signal"
                    >
                        open
                        <ArrowUpRight className="h-3 w-3" />
                    </span>
                </div>
            </div>
        </article>
    );
}

async function SearchAndFilterBar({
    currentTag,
    currentSearch,
}: {
    currentTag: string;
    currentSearch: string;
}) {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from('posts')
        .select('tags')
        .eq('published', true);

    const allTags = new Set<string>();
    if (posts) {
        posts.forEach((post: { tags: string | string[] }) => {
            let tags: string[] = [];
            if (typeof post.tags === 'string') {
                try {
                    const parsedTags = JSON.parse(post.tags);
                    tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
                } catch {
                    tags = post.tags
                        .replace(/[\[\]"]/g, '')
                        .split(',')
                        .map((t) => t.trim());
                }
            } else if (Array.isArray(post.tags)) {
                tags = post.tags;
            }
            tags.filter(Boolean).forEach((t) => allTags.add(t));
        });
    }

    const popularTags = Array.from(allTags).slice(0, 6);

    return (
        <div className="mt-12 overflow-hidden rounded-lg border border-rule bg-paper-raised">
            {/* Window header */}
            <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="ml-2 font-mono text-xs text-ink-muted">
                    blog/search
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    GET /posts
                </span>
            </div>

            <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_1fr]">
                {/* Search input */}
                <form action="/blog" className="relative border-b border-rule lg:border-b-0 lg:border-r">
                    <label htmlFor="blog-search" className="sr-only">
                        Search articles
                    </label>
                    <div className="flex items-center gap-3 px-4 py-4">
                        <TerminalIcon className="h-4 w-4 shrink-0 text-signal" />
                        <span className="font-mono text-xs text-ink-faint">~/blog $</span>
                        <input
                            id="blog-search"
                            type="text"
                            name="search"
                            placeholder="grep --posts ..."
                            defaultValue={currentSearch}
                            className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-faint focus:placeholder:text-ink-muted"
                            autoComplete="off"
                        />
                        <Search className="h-4 w-4 shrink-0 text-ink-faint" />
                    </div>
                    {currentTag && (
                        <input type="hidden" name="tag" value={currentTag} />
                    )}
                </form>

                {/* Popular tags */}
                <div className="flex flex-wrap items-center gap-2 px-4 py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                        popular:
                    </span>
                    {popularTags.length === 0 && (
                        <span className="font-mono text-[11px] text-ink-faint">— none yet —</span>
                    )}
                    {popularTags.map((t) => (
                        <Link
                            key={t}
                            href={`/blog?tag=${encodeURIComponent(t)}`}
                            className={
                                currentTag === t
                                    ? 'inline-flex items-center gap-1 rounded-md border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-signal'
                                    : 'inline-flex items-center gap-1 rounded-md border border-rule bg-paper-sunken px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition-colors hover:border-signal/40 hover:text-signal'
                            }
                        >
                            <Hash className="h-3 w-3" />
                            {t}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function estimateReadingMinutes(post: ProcessedPost): number {
    const txt = (post.description || '') + ' ' + (post.title || '');
    const words = txt.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 60));
}

function SearchBarSkeleton() {
    return (
        <div className="mt-12 overflow-hidden rounded-lg border border-rule bg-paper-raised">
            <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                <div className="h-14 animate-pulse border-b border-rule bg-paper-sunken/40 lg:border-b-0 lg:border-r" />
                <div className="h-14 animate-pulse bg-paper-sunken/30" />
            </div>
        </div>
    );
}

function PostsGridSkeleton() {
    return (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-lg border border-rule bg-paper-raised"
                >
                    <div className="flex items-center justify-between border-b border-rule bg-paper-sunken px-4 py-2.5">
                        <span className="h-3 w-16 animate-pulse rounded bg-rule" />
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rule" />
                    </div>
                    <div className="aspect-[16/10] animate-pulse bg-paper-sunken/50" />
                    <div className="space-y-3 p-5">
                        <div className="h-3 w-24 animate-pulse rounded bg-rule" />
                        <div className="h-5 w-3/4 animate-pulse rounded bg-rule" />
                        <div className="space-y-2">
                            <div className="h-3 w-full animate-pulse rounded bg-rule" />
                            <div className="h-3 w-5/6 animate-pulse rounded bg-rule" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function NoPostsFound({ search, tag }: { search: string; tag: string }) {
    const lines: string[] = [];
    if (search && tag) lines.push(`grep "${search}" --tag="${tag}" → 0 matches`);
    else if (search) lines.push(`grep "${search}" → 0 matches`);
    else if (tag) lines.push(`filter --tag="${tag}" → 0 matches`);
    else lines.push('ls ./posts → empty');
    lines.push('hint: try clearing filters or different keywords');

    return (
        <div className="mt-12 overflow-hidden rounded-lg border border-rule bg-paper-raised frame-brackets">
            <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="ml-2 font-mono text-xs text-ink-muted">
                    blog/empty
                </span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm text-ink">
                {lines.map((l, i) => (
                    <div key={i} className="flex gap-3">
                        <span className="select-none text-ink-faint">{`>`}</span>
                        <span>{l}</span>
                    </div>
                ))}
                <div className="pt-3">
                    <Link href="/blog" className="btn-ghost">
                        <ArrowUpRight className="h-3 w-3" />
                        view all posts
                    </Link>
                </div>
            </div>
        </div>
    );
}

function BlogError({ message }: { message: string }) {
    return (
        <div className="mt-12 overflow-hidden rounded-lg border border-rule bg-paper-raised frame-brackets">
            <div className="flex items-center gap-2 border-b border-rule bg-paper-sunken px-3.5 py-2.5">
                <span className="dot-light bg-danger/80" />
                <span className="dot-light bg-rule-strong" />
                <span className="dot-light bg-rule-strong" />
                <span className="ml-2 font-mono text-xs text-ink-muted">
                    blog/error
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-danger">
                    500
                </span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm">
                <div className="flex gap-3">
                    <span className="select-none text-ink-faint">{`>`}</span>
                    <span className="text-danger">{message}</span>
                </div>
                <div className="flex gap-3">
                    <span className="select-none text-ink-faint">{`>`}</span>
                    <span className="text-ink-muted">try refreshing the page</span>
                </div>
            </div>
        </div>
    );
}
