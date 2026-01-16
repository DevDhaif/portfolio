
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { CookieValue } from '@/types'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    try {

                        return cookieStore.getAll().map((cookie: ResponseCookie): CookieValue => ({
                            name: cookie.name,
                            value: cookie.value
                        }))
                    } catch {
                        return []
                    }
                },
                setAll(cookiesToSet: CookieValue[]) {
                    try {
                        cookiesToSet.forEach((cookie: CookieValue) => {

                            cookieStore.set({
                                name: cookie.name,
                                value: cookie.value,
                                ...cookie.options
                            })
                        })
                    } catch {



                    }
                }
            }
        }
    )
}