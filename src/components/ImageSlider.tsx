"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

function ImageSlider({ images }: { images: { url: string; alt: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))
        }, 3000)  

        return () => clearInterval(interval)
    }, [images.length, currentIndex])

    const handlePrevious = () => {
        setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1))
    }

    const handleNext = () => {
        setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))
    }

    return (
        <div className="w-full mx-auto px-4 shadow-xl">
            <div className="relative aspect-[16/9]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        className="w-full h-full object-contain rounded-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </div>

                {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-primary/50"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div> */}
            </div>
        </div>
    )
}
export default ImageSlider;