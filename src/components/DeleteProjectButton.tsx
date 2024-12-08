
'use client'

import { useTransition } from 'react'

interface DeleteProjectButtonProps {
    projectId: string
    onDelete: (id: string) => Promise<void>
}

export function DeleteProjectButton({ projectId, onDelete }: DeleteProjectButtonProps) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            type="button"
            disabled={isPending}
            className="text-red-500 hover:text-red-600 disabled:opacity-50"
            onClick={() => {
                if (confirm('Are you sure you want to delete this project?')) {
                    startTransition(async () => {
                        await onDelete(projectId)
                    })
                }
            }}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    )
}