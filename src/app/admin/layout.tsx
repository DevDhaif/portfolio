import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { signOut } from '@/app/auth/actions'
import { SessionProvider } from '@/components/SessionProvider'
import { LogOut, User } from 'lucide-react'
import { Suspense } from 'react'
import Navigation from '@/components/Navigation'

function LoadingState() {
    return (
        <div className="animate-pulse min-h-screen flex">
            <div className="w-64 bg-gray-900">
                <div className="h-24 border-b border-gray-800" />
                <div className="p-4 space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 bg-gray-800 rounded" />
                    ))}
                </div>
            </div>
            <div className="flex-1">
                <div className="h-16 bg-gray-100" />
            </div>
        </div>
    )
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    return (
        <SessionProvider>
            <ProtectedRoute>
                <Suspense fallback={<LoadingState />}>
                    <div className="min-h-screen flex bg-gray-50">
                        {/* Sidebar */}
                        <div className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
                            <div className="p-6 border-b border-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-800/50">
                                        <User className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold leading-none">
                                            Admin Dashboard
                                        </h1>
                                        <p className="text-sm text-gray-400 mt-1 truncate max-w-[180px]">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Navigation />
                        </div>

                        {/* Main content */}
                        <div className="flex-1 flex flex-col min-h-screen">
                            <header className="bg-white border-b border-gray-200/80 sticky top-0 z-10">
                                <div className="max-w-7xl mx-auto px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Admin Panel
                                        </h2>
                                        <form action={signOut}>
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg
                                                         bg-gray-100 hover:bg-gray-200
                                                         text-gray-700 text-sm font-medium
                                                         transition-all duration-200
                                                         hover:shadow-sm active:scale-95"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </header>

                            <main className="flex-1 w-full">
                                <div className="max-w-7xl mx-auto px-6 py-8">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </Suspense>
            </ProtectedRoute>
        </SessionProvider>
    )
}