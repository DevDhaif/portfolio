import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
    // Only check auth for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        })

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: any) {
                        response.cookies.set({ name, value, ...options })
                    },
                    remove(name: string, options: any) {
                        response.cookies.delete({ name, ...options })
                    },
                },
            }
        )

        const { data: { session } } = await supabase.auth.getSession()

        // If no session and trying to access admin, redirect to login
        if (!session && request.nextUrl.pathname.startsWith('/admin')) {
            const redirectUrl = new URL('/login', request.url)
            return NextResponse.redirect(redirectUrl)
        }

        return response
    }

    // Allow all other routes
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Only run middleware on admin routes and auth routes
        '/admin/:path*',
    ],
}