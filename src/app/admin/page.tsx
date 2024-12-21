import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'
import { ArrowUpRight, BookOpen, Award, FolderGit2 } from 'lucide-react'

// Separate component for each stat to enable individual loading
async function StatCard({
    title,
    table,
    icon: Icon
}: {
    title: string;
    table: string;
    icon: any;
}) {
    const supabase = await createClient()
    const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold mt-2">{count || 0}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-500" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>View all</span>
            </div>
        </div>
    )
}

// Loading placeholder
function StatCardLoading() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-16 bg-gray-200 rounded mt-2" />
                <div className="h-4 w-20 bg-gray-200 rounded mt-4" />
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                {/* Add any actions here */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense fallback={<StatCardLoading />}>
                    <StatCard
                        title="Total Projects"
                        table="projects"
                        icon={FolderGit2}
                    />
                </Suspense>

                <Suspense fallback={<StatCardLoading />}>
                    <StatCard
                        title="Total Certificates"
                        table="certificates"
                        icon={Award}
                    />
                </Suspense>

                <Suspense fallback={<StatCardLoading />}>
                    <StatCard
                        title="Total Blog Posts"
                        table="posts"
                        icon={BookOpen}
                    />
                </Suspense>
            </div>

            {/* You can add more dashboard sections here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add recent activity, charts, etc. */}
            </div>
        </div>
    )
}