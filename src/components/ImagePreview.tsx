// components/ImagePreview.tsx
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImagePreviewProps {
  src: string
  alt: string
  onRemove?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function ImagePreview({ src, alt, onRemove, size = 'md' }: ImagePreviewProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  }

  return (
    <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden border border-gray-200`}>
      <Image
        src={src}
        alt={alt}
        width={size === 'sm' ? 64 : size === 'md' ? 96 : 128}
        height={size === 'sm' ? 64 : size === 'md' ? 96 : 128}
        className="object-cover w-full h-full"
      />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

