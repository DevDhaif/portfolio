// app/admin/certificates/error.tsx
'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <h2 className="text-red-800 font-semibold">Something went wrong!</h2>
            <button
                onClick={() => reset()}
                className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
            >
                Try again
            </button>
        </div>
    )
}