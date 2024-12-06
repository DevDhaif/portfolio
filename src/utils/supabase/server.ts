// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

interface CookieValue {
    name: string
    value: string
    options?: CookieOptions
}

export function createClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    try {
                        // Using type assertion instead of await
                        return (cookieStore as any).getAll().map((cookie: ResponseCookie): CookieValue => ({
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
                            // Using type assertion instead of await
                            (cookieStore as any).set({
                                name: cookie.name,
                                value: cookie.value,
                                ...cookie.options
                            })
                        })
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                }
            }
        }
    )
}