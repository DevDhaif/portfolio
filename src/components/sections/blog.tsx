"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogCard } from "../ui/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { createClient } from '@/utils/supabase/client';

interface Post {
    id: string;
    title: string;
    description: string;
    cover_image: string;
    slug: string;
    created_at: string;
    tags: string[];
}

export function BlogSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(3);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

    // Fetch posts from Supabase
    useEffect(() => {
        async function fetchPosts() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(6);

            if (!error && data) {
                const postsWithUrls = data.map(post => {
                    let coverImageUrl = post.cover_image;
                    if (post.cover_image && !post.cover_image.startsWith('http')) {
                        coverImageUrl = supabase.storage
                            .from('blog-content')
                            .getPublicUrl(post.cover_image)
                            .data.publicUrl;
                    }
                    return { ...post, cover_image: coverImageUrl };
                });
                setPosts(postsWithUrls);
            }
            setLoading(false);
        }

        fetchPosts();
    }, []);

    const loadMore = () => {
        setVisiblePosts(prev => Math.min(prev + 3, posts.length));
    };

    return (
        <section
            id="blog"
            ref={containerRef}
            className="py-24 md:py-32 relative overflow-hidden bg-background"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5 pointer-events-none" />

            <motion.div
                style={{ opacity, y }}
                className="container max-w-6xl mx-auto px-4 relative z-10"
            >
                <SectionHeading
                    title="Blog & Insights"
                    subtitle="Articles, tutorials, and thoughts on web development"
                    badge="Latest Posts"
                />

                {loading ? (
                    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
                        <p className="text-text-secondary text-sm">Loading latest posts...</p>
                    </div>
                ) : (
                    <>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.slice(0, visiblePosts).map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <BlogCard
                                        id={post.id}
                                        title={post.title}
                                        description={post.description}
                                        date={post.created_at}
                                        coverImage={post.cover_image}
                                        slug={post.slug}
                                        tags={post.tags || []}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Load More / View All buttons */}
                        <div className="mt-12 flex justify-center gap-4">
                            {visiblePosts < posts.length && (
                                <Button onClick={loadMore} variant="outline" className="bg-card border-border hover:border-accent-primary/30 text-text-primary">
                                    Load More
                                </Button>
                            )}

                            <Button asChild variant="outline" className="bg-accent-subtle border-accent-primary/30 text-accent-primary">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center"
                                >
                                    View All Articles
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </motion.div>
        </section>
    );
}