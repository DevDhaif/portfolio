// components/ImageUpload.tsx
'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageUploadProps {
    onChange: (files: File[]) => void
    value: File[]
    maxFiles?: number
    bucket?: string
    multiple?: boolean
    currentImage?: string
    currentImages?: string[]
}
export default function ImageUpload({
    onChange,
    value = [],
    maxFiles = 1,
    bucket = 'projects-images',
    multiple = false,
    currentImage,
    currentImages = []
}: ImageUploadProps) {
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        if (files.length + value.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} files`)
            return
        }
        onChange([...value, ...files])
    }

    const handleRemove = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove))
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-4">
                {/* Show current images if no new ones selected */}
                {value.length === 0 && currentImage && (
                    <div className="relative">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${currentImage}`}
                            alt="Current image"
                            className="h-32 w-32 object-cover rounded-md"
                        />
                    </div>
                )}
                {value.length === 0 && currentImages && currentImages.map((img, index) => (
                    <div key={img} className="relative">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${img}`}
                            alt={`Current image ${index + 1}`}
                            className="h-32 w-32 object-cover rounded-md"
                        />
                    </div>
                ))}

                {/* Show new selected images */}
                {value.map((file, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected image ${index + 1}`}
                            className="h-32 w-32 object-cover rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {value.length < maxFiles && (
                <input
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                />
            )}
        </div>
    )
}