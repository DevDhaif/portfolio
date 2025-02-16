// app/server-sitemap.xml/route.ts
import { createClient } from '@/utils/supabase/server'
import { getServerSideSitemap } from 'next-sitemap'
import type { ISitemapField } from 'next-sitemap'

export async function GET() {
    const supabase = createClient()
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .order('created_at', { ascending: false })

    const fields: ISitemapField[] = posts?.map((post) => ({
        loc: `https://devdhaif.vercel.app/blog/${post.slug}`,
        lastmod: post.updated_at,
        changefreq: 'weekly' as const,
        priority: 0.7,
    })) || []

    const staticPages: ISitemapField[] = [
        {
            loc: 'https://devdhaif.vercel.app',
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 1.0,
        },
        {
            loc: 'https://devdhaif.vercel.app/projects',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
        },
        {
            loc: 'https://devdhaif.vercel.app/blog',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
        },
    ]

    return getServerSideSitemap([...staticPages, ...fields])
}