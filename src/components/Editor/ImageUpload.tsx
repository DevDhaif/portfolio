
import { ImageUploadProps } from '@/types'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


export default function ImageUpload({ value, onChange, maxFiles = 1, bucket }: ImageUploadProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [onChange])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles,
        accept: {
            'image/*': []
        }
    })

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {value.length > 0 ? (
                <div className="space-y-2">
                    {value.map((file, index) => (
                        <div key={index} className="text-sm">
                            {file.name}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Drag & drop images here, or click to select</p>
            )}
        </div>
    )
}
