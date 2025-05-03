
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Editor } from '@/components/Editor'
import ImageUpload from '@/components/ImageUpload'
import { createPost } from '../actions'

export default function NewPostPage() {
    const [coverImage, setCoverImage] = useState<File[]>([])
    const [content, setContent] = useState({})
    const [editorImages, setEditorImages] = useState<Map<string, File>>(new Map())


    async function handleSubmit(formData: FormData) {
        try {
            const supabase = createClient()

            // Handle cover image upload
            let coverImageUrl = null
            if (coverImage.length > 0) {
                const fileName = `${Date.now()}-${coverImage[0].name}`
                const { error: uploadError } = await supabase.storage
                    .from('blog-content')
                    .upload(fileName, coverImage[0])

                if (uploadError) throw uploadError
                coverImageUrl = fileName
            }

            // Process editor content and upload images
            let processedContent = JSON.parse(JSON.stringify(content))

            const processImages = async (node: any): Promise<any> => {
                if (node.type === 'image') {
                    const blobUrl = node.attrs.src
                    if (blobUrl.startsWith('blob:')) {
                        const file = editorImages.get(blobUrl)
                        if (file) {
                            const fileName = `content-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`
                            const { error: uploadError } = await supabase.storage
                                .from('blog-content')
                                .upload(fileName, file)

                            if (uploadError) throw uploadError

                            return {
                                ...node,
                                attrs: {
                                    ...node.attrs,
                                    src: fileName
                                }
                            }
                        }
                    }
                    return node
                }

                if (node.content) {
                    const processedContent = await Promise.all(
                        node.content.map(processImages)
                    )
                    return { ...node, content: processedContent }
                }

                return node
            }

            processedContent = await processImages(processedContent)

            // Prepare and submit form data
            const submitFormData = new FormData();
            submitFormData.set('title', formData.get('title') as string);
            submitFormData.set('description', formData.get('description') as string);
            submitFormData.set('content', JSON.stringify(processedContent));
            submitFormData.set('coverImage', coverImageUrl || '');
            submitFormData.set('tags', JSON.stringify(
                formData.get('tags')?.toString().split(',').map(t => t.trim()).filter(Boolean) || []
            ));

            const result = await createPost(submitFormData)

            if (result?.error) {
                throw new Error(result.error)
            }

            // If successful, redirect manually
            if (result?.success) {
                window.location.href = '/admin/blog'
            }

        } catch (error) {
            console.error('Error:', error)
            alert('Error creating post. Please try again.')
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 ">
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
                    <Editor
                        content=""
                        onChange={setContent}
                        onTempFileChange={setEditorImages}
                    />
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