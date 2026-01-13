// app/server-sitemap.xml/route.ts
import { createClient } from '@/utils/supabase/server';
import { getServerSideSitemap } from 'next-sitemap';
import type { ISitemapField } from 'next-sitemap';

export async function GET() {
  const supabase = await createClient();

  // Fetch all published blog posts
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  // Fetch all projects
  const { data: projects } = await supabase
    .from('projects')
    .select('id, updated_at, created_at')
    .order('created_at', { ascending: false });

  // Blog post URLs
  const blogFields: ISitemapField[] =
    posts?.map((post) => ({
      loc: `https://devdhaif.vercel.app/blog/${post.slug}`,
      lastmod: post.updated_at || post.created_at || new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8,
    })) || [];

  // Project URLs
  const projectFields: ISitemapField[] =
    projects?.map((project) => ({
      loc: `https://devdhaif.vercel.app/projects/${project.id}`,
      lastmod:
        project.updated_at || project.created_at || new Date().toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })) || [];

  // Static pages with proper priorities
  const staticPages: ISitemapField[] = [
    {
      loc: 'https://devdhaif.vercel.app',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: 'https://devdhaif.vercel.app/blog',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
  ];

  return getServerSideSitemap([
    ...staticPages,
    ...blogFields,
    ...projectFields,
  ]);
}
