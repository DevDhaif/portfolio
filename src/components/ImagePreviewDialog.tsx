'use client'

import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface ImagePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    altText?: string
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
}

export function ImagePreviewDialog({
    isOpen,
    onClose,
    imageUrl,
    altText = "Image preview",
    onNext,
    onPrevious,
    hasNext,
    hasPrevious
}: ImagePreviewDialogProps) {
    const [zoom, setZoom] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setZoom(1)
        setIsLoading(true)
    }, [imageUrl])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
            onPrevious()
        } else if (e.key === 'ArrowRight' && hasNext && onNext) {
            onNext()
        } else if (e.key === 'Escape') {
            onClose()
        }
    }, [onNext, onPrevious, hasPrevious, hasNext, onClose])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `image-${Date.now()}.jpg`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Error downloading image:', error)
        }
    }

    if (!isOpen || !imageUrl) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogTitle className="sr-only">{altText}</DialogTitle>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full p-0 overflow-hidden bg-black/95">
                {/* Top controls */}
                <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setZoom(prev => Math.max(1, prev - 0.5))}
                            disabled={zoom === 1}
                        >
                            <ZoomOut className="text-white h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setZoom(prev => Math.min(3, prev + 0.5))}
                            disabled={zoom === 3}
                        >
                            <ZoomIn className="text-white h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDownload}
                        >
                            <Download className="text-white h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white hover:text-white/80"
                    >
                        <X className="text-white h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation buttons */}
                {hasPrevious && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white/80"
                        onClick={onPrevious}
                    >
                        <ChevronLeft className="text-white h-8 w-8" />
                    </Button>
                )}
                {hasNext && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white/80"
                        onClick={onNext}
                    >
                        <ChevronRight className="text-white h-8 w-8" />
                    </Button>
                )}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}

                {/* Image container */}
                <div
                    className="relative w-full h-full overflow-auto"
                    style={{
                        cursor: zoom > 1 ? 'move' : 'default'
                    }}
                >
                    <div
                        className="relative w-full h-full transition-transform duration-200"
                        style={{
                            minHeight: '80vh',
                            transform: `scale(${zoom})`
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={altText}
                            fill
                            className="object-contain"
                            priority
                            sizes="95vw"
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}