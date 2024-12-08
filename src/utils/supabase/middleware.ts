import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = await createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    try {
                        return Array.from(request.cookies.getAll()).map(({ name, value }) => ({
                            name,
                            value,
                        }))
                    } catch {
                        return []
                    }
                },
                setAll(cookies) {
                    try {
                        cookies.forEach((cookie) => {

                            response = NextResponse.next({
                                request: {
                                    headers: request.headers,
                                },
                            })
                            response.cookies.set({
                                name: cookie.name,
                                value: cookie.value,
                                ...cookie.options,

                                ...(cookie.options?.maxAge && {
                                    maxAge: cookie.options.maxAge
                                }),
                            })
                        })
                    } catch (error) {
                        console.error('Error setting cookies:', error)
                    }
                },
            },
        }
    )

    await supabase.auth.getSession()

    return response
}