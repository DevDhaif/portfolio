// components/ImageUpload.tsx
'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageUploadProps {
    onChange: (files: File[]) => void
    value: File[]
    maxFiles?: number
    bucket?: string  // Add this line
}

export default function ImageUpload({
    onChange,
    value = [],
    maxFiles = 1
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
                {value.map((file, index) => (
                    <div key={index} className="relative">
                        <div className="h-32 w-32 border rounded-md">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`Selected image ${index + 1}`}
                                width={200}
                                height={200}
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {value.length < maxFiles && (
                <div>
                    <label className="cursor-pointer block">
                        <span className="sr-only">Choose image</span>
                        <input
                            type="file"
                            className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </label>
                </div>
            )}
        </div>
    )
}