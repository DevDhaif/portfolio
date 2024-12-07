// app/admin/page.tsx
import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Projects</h2>
                    <p className="text-3xl font-bold">{projects?.length || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Certificates</h2>
                    <p className="text-3xl font-bold">{certificates?.length || 0}</p>
                </div>
                {/* Add more dashboard widgets as needed */}
            </div>
        </div>
    )
}

