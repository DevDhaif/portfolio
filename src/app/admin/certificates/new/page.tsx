
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'
import { createCertificate } from '../actions'

export default function NewCertificatePage() {
    const [sourceIcon, setSourceIcon] = useState<File[]>([])
    const [certificateImage, setCertificateImage] = useState<File[]>([])

    async function handleSubmit(formData: FormData) {
        try {
            const supabase = createClient()
            // ignore ts error
            // @ts-ignore
            let sourceIconUrl = null;
            let certificateImageUrl = null;


            if (sourceIcon.length > 0) {
                const fileName = `${Date.now()}-${sourceIcon[0].name}`
                const { error: uploadError } = await supabase.storage
                    .from('certificates-icons')
                    .upload(fileName, sourceIcon[0])

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('certificates-icons')
                    .getPublicUrl(fileName)

                sourceIconUrl = publicUrl
                formData.set('sourceIcon', publicUrl)
            }


            if (certificateImage.length > 0) {
                const fileName = `${Date.now()}-${certificateImage[0].name}`
                const { error: uploadError } = await supabase.storage
                    .from('certificates-images')
                    .upload(fileName, certificateImage[0])

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('certificates-images')
                    .getPublicUrl(fileName)

                certificateImageUrl = publicUrl
                formData.set('certificateImage', publicUrl)
            }


            const result = await createCertificate(formData)

            if (result?.error) {
                throw new Error(result.error)
            }

        } catch (error) {
            console.error('Error:', error)
            alert('Error creating certificate. Please try again.')
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Add New Certificate</h1>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        placeholder="React, TypeScript, Node.js"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700">
                        Credential ID
                    </label>
                    <input
                        type="text"
                        id="credentialId"
                        name="credentialId"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                        Issue Date *
                    </label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                        Source *
                    </label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        required
                        placeholder="Udemy, Coursera, etc."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Source Icon
                    </label>
                    <ImageUpload
                        value={sourceIcon}
                        onChange={setSourceIcon}
                        maxFiles={1}
                        bucket="certificates-images"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Certificate Image
                    </label>
                    <ImageUpload
                        value={certificateImage}
                        onChange={setCertificateImage}
                        maxFiles={1}
                        bucket="certificates-images"
                    />
                </div>

                <div>
                    <label htmlFor="urlLink" className="block text-sm font-medium text-gray-700">
                        URL Link
                    </label>
                    <input
                        type="url"
                        id="urlLink"
                        name="urlLink"
                        placeholder="https://"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/certificates"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Certificate
                    </button>
                </div>
            </form>
        </div>
    )
}