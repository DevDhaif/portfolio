// app/api/posts/count/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
    try {
        const supabase = await createClient()
        const { count, error } = await supabase
            .from('posts')
            .select('*', { count: 'exact' })
            .eq('published', true)

        if (error) {
            throw error
        }

        return NextResponse.json({ count })
    } catch (error) {
        console.error('Error fetching post count:', error)
        return NextResponse.json({ error: 'Failed to fetch post count' }, { status: 500 })
    }
}