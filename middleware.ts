import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const THEME_ROUTES: Record<string, { en: string; ar: string }> = {
    default:   { en: '/',                              ar: '/' },
    notebook:  { en: '/experiments/notebook',          ar: '/experiments/notebook/ar' },
    qamariya:  { en: '/experiments/qamariya',          ar: '/experiments/qamariya/ar' },
    spacetoon: { en: '/experiments/spacetoon',         ar: '/experiments/spacetoon/ar' },
}

export async function middleware(request: NextRequest) {
    /**
     * First-visit routing: when the user lands on `/`, look for the
     * `pf_theme` + `pf_lang` cookies set by /select.
     *  - No cookie  → send them to /select (one-time picker).
     *  - default    → fall through, show the existing terminal portfolio.
     *  - other      → redirect to that theme's localized route.
     *
     * /select itself is always served — that's how users re-pick.
     */
    if (request.nextUrl.pathname === '/') {
        const theme = request.cookies.get('pf_theme')?.value
        const lang = (request.cookies.get('pf_lang')?.value === 'ar' ? 'ar' : 'en') as 'en' | 'ar'

        if (!theme) {
            return NextResponse.redirect(new URL('/select', request.url))
        }

        const target = THEME_ROUTES[theme]
        if (target && theme !== 'default') {
            return NextResponse.redirect(new URL(target[lang], request.url))
        }
        // theme === 'default' or unknown → show / as-is
    }

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


        if (!session && request.nextUrl.pathname.startsWith('/admin')) {
            const redirectUrl = new URL('/login', request.url)
            return NextResponse.redirect(redirectUrl)
        }

        return response
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/admin/:path*',
    ],
}
