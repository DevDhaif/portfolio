import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Search, Tag, Calendar, Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Types
interface Post {
    id: string;
    title: string;
    description: string;
    content: {
        type: string;
        content: any[];
    };
    cover_image: string;
    tags: string[] | string;
    created_at: string;
    slug: string;
}

interface ProcessedPost {
    id: string;
    title: string;
    description: string;
    content: {
        type: string;
        content: any[];
    };
    cover_image: string;
    tags: string[];
    created_at: string;
    slug: string;
}
interface BlogPageProps {
    params?: any;
    searchParams: Promise<{ tag?: string; search?: string }>;
}
// Main page component with search params
export default async function BlogPage({
    searchParams,
}: BlogPageProps) {

    const resolvedParams = await searchParams;

    const tag = resolvedParams?.tag || '';
    const search = resolvedParams?.search || '';

    return (
        <div className="min-h-screen bg-background py-16 md:py-24 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5 pointer-events-none" />

            <div className="container max-w-6xl mx-auto px-4">
                {/* Header section */}
                <div className="mb-12 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
                        Blog <span className="text-accent-primary">& Insights</span>
                    </h1>
                    <p className="text-text-secondary max-w-2xl">
                        Thoughts, tutorials, and insights about web development, design patterns, and the latest technologies.
                    </p>

                    <Suspense fallback={<SearchBarSkeleton />}>
                        <SearchAndFilterBar currentTag={tag} currentSearch={search} />
                    </Suspense>
                </div>

                {/* Posts grid */}
                <Suspense fallback={<PostsGridSkeleton />}>
                    <PostsGrid tag={tag} search={search} />
                </Suspense>
            </div>
        </div>
    )
}

// Component to fetch and display posts
async function PostsGrid({ tag, search }: { tag: string; search: string }) {
    const supabase = await createClient();

    // Fetch posts
    let query = supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    // Apply search filter if provided
    if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: posts, error } = await query;

    if (error) {
        // console.error('Error fetching posts:', error);
        return <BlogError message="Failed to load blog posts" />;
    }

    if (!posts || posts.length === 0) {
        return <NoPostsFound search={search} tag={tag} />;
    }

    // Process posts
    const processedPosts: ProcessedPost[] = posts.map((post: Post) => {
        // Process cover image
        let coverImageUrl = post.cover_image;
        if (post.cover_image && !post.cover_image.startsWith('http')) {
            coverImageUrl = supabase.storage
                .from('blog-content')
                .getPublicUrl(post.cover_image)
                .data.publicUrl;
        }

        // Process tags
        let processedTags: string[] = [];
        if (typeof post.tags === 'string') {
            try {
                const parsedTags = JSON.parse(post.tags);
                processedTags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
            } catch {
                processedTags = post.tags
                    .replace(/[\[\]"]/g, '')
                    .split(',')
                    .map(tag => tag.trim());
            }
        } else if (Array.isArray(post.tags)) {
            processedTags = post.tags;
        }

        return {
            ...post,
            cover_image: coverImageUrl,
            tags: processedTags.filter(tag => tag),
        };
    });

    // Filter by tag if provided
    const filteredPosts = tag
        ? processedPosts.filter(post =>
            post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        )
        : processedPosts;

    if (filteredPosts.length === 0) {
        return <NoPostsFound search={search} tag={tag} />;
    }

    // Get all unique tags for the tag cloud
    const allTags = Array.from(
        new Set(
            processedPosts.flatMap(post => post.tags)
        )
    ).sort();

    return (
        <div className="space-y-10">
            {/* Display the tag filter if a tag is selected */}
            {tag && (
                <div className="flex items-center justify-between bg-card/50 border border-border p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-accent-primary" />
                        <span className="text-text-primary">Filtered by tag: </span>
                        <span className="font-medium text-accent-primary">{tag}</span>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" size="sm">Clear Filter</Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Tag cloud */}
            {!tag && allTags.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                    <h2 className="text-xl font-display font-medium mb-4 text-text-primary">
                        Browse by Topic
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className="inline-flex items-center rounded-full bg-card border border-border hover:border-accent-primary/30 px-3 py-1.5 text-sm transition-colors duration-200 hover:bg-accent-subtle"
                            >
                                <Tag className="mr-1.5 h-3.5 w-3.5 text-accent-primary" />
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// BlogPostCard component
function BlogPostCard({ post }: { post: ProcessedPost }) {
    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="h-full rounded-xl border border-border bg-card hover:border-accent-primary/30 hover:shadow-glow transition-all duration-300 overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 opacity-60" />
                    {post.cover_image ? (
                        <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-accent-primary/5 flex items-center justify-center">
                            <span className="text-accent-primary/30 text-lg">No image</span>
                        </div>
                    )}

                    {/* Tags overlay */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5 justify-end max-w-[70%]">
                            {post.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center rounded-full bg-accent-primary/15 backdrop-blur-md px-2 py-0.5 text-xs font-medium text-accent-primary border border-accent-primary/20"
                                >
                                    {tag}
                                </span>
                            ))}
                            {post.tags.length > 2 && (
                                <span className="inline-flex items-center rounded-full bg-background/60 backdrop-blur-md px-2 py-0.5 text-xs font-medium text-text-secondary">
                                    +{post.tags.length - 2}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 mb-2 text-xs text-text-secondary">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                        {post.description}
                    </p>

                    {/* Read more */}
                    <div className="mt-auto pt-2 text-sm font-medium text-accent-primary flex items-center opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        Read more
                        <span className="ml-1 text-xs">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Search and filter component
async function SearchAndFilterBar({ currentTag, currentSearch }: { currentTag: string; currentSearch: string }) {
    const supabase = createClient();

    // Fetch tags for the filter
    const { data: posts } = await supabase
        .from('posts')
        .select('tags')
        .eq('published', true);

    // Process all tags
    const allTags = new Set<string>();

    if (posts) {
        posts.forEach((post: { tags: string[] | string }) => {
            let tags: string[] = [];

            if (typeof post.tags === 'string') {
                try {
                    const parsedTags = JSON.parse(post.tags);
                    tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
                } catch {
                    tags = post.tags
                        .replace(/[\[\]"]/g, '')
                        .split(',')
                        .map(tag => tag.trim());
                }
            } else if (Array.isArray(post.tags)) {
                tags = post.tags;
            }

            tags.filter(Boolean).forEach(tag => allTags.add(tag));
        });
    }

    // Popular tags (limited to 5)
    const popularTags = Array.from(allTags).slice(0, 5);

    return (
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search form */}
            <div className="flex-1 max-w-md">
                <form className="relative group" action="/blog">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search articles..."
                        defaultValue={currentSearch}
                        className="pl-10 bg-card/50 border-border focus:border-accent-primary/50"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary group-focus-within:text-accent-primary transition-colors" />
                    {currentSearch && (
                        <input type="hidden" name="tag" value={currentTag} />
                    )}
                </form>
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-text-secondary">Popular:</span>
                {popularTags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className={`text-sm px-2.5 py-1 rounded-full transition-colors ${currentTag === tag
                            ? 'bg-accent-primary/20 text-accent-primary'
                            : 'bg-card text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Loading skeletons
function SearchBarSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-4 animate-pulse">
            <div className="flex-1 max-w-md h-10 bg-card/50 rounded-md"></div>
            <div className="flex gap-2 items-center">
                <div className="w-16 h-4 bg-card/50 rounded"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-16 bg-card/50 rounded-full"></div>
                ))}
            </div>
        </div>
    );
}

function PostsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
                    <div className="h-48 bg-card/50"></div>
                    <div className="p-5 space-y-4">
                        <div className="h-4 w-24 bg-card/50 rounded"></div>
                        <div className="h-6 w-3/4 bg-card/50 rounded"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-card/50 rounded"></div>
                            <div className="h-4 w-full bg-card/50 rounded"></div>
                            <div className="h-4 w-2/3 bg-card/50 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// No posts found component
function NoPostsFound({ search, tag }: { search: string; tag: string }) {
    return (
        <div className="text-center py-16 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-primary/10 text-accent-primary mb-4">
                <Search className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-medium text-text-primary">No posts found</h2>
            <p className="text-text-secondary max-w-md mx-auto">
                {search && tag
                    ? `No articles matching "${search}" with tag "${tag}"`
                    : search
                        ? `No articles matching "${search}"`
                        : tag
                            ? `No articles with tag "${tag}"`
                            : "No articles published yet. Check back soon!"}
            </p>
            <div className="pt-4">
                <Link href="/blog">
                    <Button variant="outline">View all posts</Button>
                </Link>
            </div>
        </div>
    );
}

// Error component
function BlogError({ message }: { message: string }) {
    return (
        <div className="text-center py-16 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-4">
                <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-medium text-text-primary">Something went wrong</h2>
            <p className="text-text-secondary">{message}</p>
        </div>
    );
}

// Alert Triangle icon
function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}