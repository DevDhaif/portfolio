// components/ProtectedRoute.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from './SessionProvider'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session, loading } = useSession()
    const router = useRouter()

    useEffect(() => {
        // Only redirect to login if we're in an admin route
        const isAdminRoute = window.location.pathname.startsWith('/admin')
        if (!loading && !session && isAdminRoute) {
            router.push('/login')
        }
    }, [session, loading, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        )
    }

    // Only block rendering for admin routes
    const isAdminRoute = window.location.pathname.startsWith('/admin')
    if (!session && isAdminRoute) {
        return null
    }

    return <>{children}</>
}