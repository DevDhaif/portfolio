"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import clsx from 'clsx'
export function CVButton({ className }: { className?: string }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/cv/Dhaifallah front-end resume-new.pdf')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Dhaifallah front-end resume-new.pdf')
            document.body.appendChild(link)
            link.click()
            link.parentNode?.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading CV:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            size="sm"
            className={clsx(
                // "bg-gradient-to-r from-blue-400 to-blue-300 text-white hover:from-blue-500 hover:to-blue-400",
                // "border border-transparent",
                // "transition-all duration-300 ease-in-out",
                // "flex items-center gap-2",
                className
            )}
            onClick={handleDownload}
            disabled={isLoading}

        >
            <div className="flex items-center gap-2">
                {isLoading ? (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                )}
                {isLoading ? 'Downloading...' : 'CV'}
            </div>
        </Button>
    )
}