
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Editor } from '@/components/Editor'
import ImageUpload from '@/components/ImageUpload'
import { createPost } from '../actions'

export default function NewPostPage() {
    const [coverImage, setCoverImage] = useState<File[]>([])
    const [content, setContent] = useState({})
    const [tempFiles, setTempFiles] = useState<Map<string, File>>(new Map())

    function findImagesInContent(content: any): any[] {
        const images: any[] = []

        function traverse(node: any) {
            if (node.type === 'image') {
                images.push(node)
            }
            if (node.content) {
                node.content.forEach(traverse)
            }
        }

        traverse(content)
        return images
    }

    function replaceImageUrls(content: any, urlMap: Map<string, string>): any {
        function traverse(node: any): any {
            if (node.type === 'image' && urlMap.has(node.attrs.src)) {
                return {
                    ...node,
                    attrs: {
                        ...node.attrs,
                        src: urlMap.get(node.attrs.src),
                        'data-temp-file': undefined,
                    },
                }
            }
            if (node.content) {
                return {
                    ...node,
                    content: node.content.map(traverse),
                }
            }
            return node
        }

        return traverse(content)
    }

    async function handleSubmit(formData: FormData) {
        try {
            const supabase = createClient()
            let coverImageUrl = null


            if (coverImage.length > 0) {
                const fileName = `${Date.now()}-${coverImage[0].name}`
                const { error: uploadError } = await supabase.storage
                    .from('blog-content')
                    .upload(fileName, coverImage[0])

                if (uploadError) throw uploadError
                coverImageUrl = fileName
            }


            const images = findImagesInContent(content)
            const uploadedImages = new Map()

            for (const image of images) {
                if (image.attrs['data-temp-file']) {
                    const tempUrl = image.attrs.src
                    const file = tempFiles.get(tempUrl)
                    if (file) {
                        const fileName = `${Date.now()}-${file.name}`
                        const { error: uploadError } = await supabase.storage
                            .from('blog-content')
                            .upload(fileName, file)

                        if (uploadError) throw uploadError
                        uploadedImages.set(tempUrl, fileName)
                    }
                }
            }


            const finalContent = replaceImageUrls(content, uploadedImages)


            const tagsInput = formData.get('tags') as string
            const tags = tagsInput
                ? tagsInput.split(',')
                    .map(tag => tag.trim())
                    .filter(Boolean)
                : []


            const submitFormData = new FormData()
            submitFormData.set('title', formData.get('title') as string)
            submitFormData.set('description', formData.get('description') as string)
            submitFormData.set('content', JSON.stringify(finalContent))
            submitFormData.set('coverImage', coverImageUrl || '')
            submitFormData.set('tags', JSON.stringify(tags))


            await createPost(submitFormData)

        } catch (error) {
            if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
                console.error('Error:', error)
                alert('Error creating post. Please try again.')
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Cover Image
                    </label>
                    <ImageUpload
                        value={coverImage}
                        onChange={setCoverImage}
                        maxFiles={1}
                        bucket="blog-content"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Content *
                    </label>
                    <Editor content="" onChange={setContent} />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded"
                    >
                        Publish Post
                    </button>
                </div>
            </form>
        </div>
    )
}