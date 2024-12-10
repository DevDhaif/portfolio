// app/sitemap.ts
import { createClient } from '@/utils/supabase/server'

export default async function sitemap() {
    const supabase = await createClient()

    // Get all blog posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('published', true)

    const baseUrl = 'https://devdhaif.vercel.app/'

    // Base routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date().toISOString(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            priority: 0.8,
        },
    ]

    // Blog post routes
    const postRoutes = posts?.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at,
        priority: 0.6,
    })) || []

    return [...routes, ...postRoutes]
}