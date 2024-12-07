'use client'

import { createClient } from '@/utils/supabase/client'

export function DeleteCertificateButton({ certificateId }: { certificateId: string }) {
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            const supabase = createClient()
            try {
                const { error } = await supabase
                    .from('certificates')
                    .delete()
                    .eq('id', certificateId)

                if (error) throw error

                // Optionally, reload the page or trigger a revalidation
                window.location.reload()
            } catch (error) {
                console.error('Error deleting certificate:', error)
                alert('Failed to delete certificate. Please try again.')
            }
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
        >
            Delete
        </button>
    )
}
