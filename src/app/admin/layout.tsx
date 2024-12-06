// app/admin/layout.tsx
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { signOut } from '@/app/auth/actions'

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
        <ProtectedRoute>
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 text-white">
                    <div className="p-4">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    </div>
                    <nav className="mt-4">
                        <Link
                            href="/admin"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/admin/projects/new"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Add Project
                        </Link>
                    </nav>
                </div>
                {/* Main content */}
                <div className="flex-1 bg-gray-100">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-4 px-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Admin Panel
                                </h2>
                                <form action={async () => {
                                    'use server'
                                    await signOut()
                                }}>
                                    <button
                                        type="submit"
                                        className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            </div>
                        </div>
                    </header>
                    <main className="max-w-7xl mx-auto py-6 px-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}