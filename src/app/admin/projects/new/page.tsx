'use client'

import { useRouter } from 'next/navigation'
import { ProjectForm } from '@/components/ProjectForm'
import { createProject } from '../actions'

export default function NewProjectPage() {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const result = await createProject(formData)
        if (result?.error) {
            throw new Error(result.error)
        }
        router.push('/admin/projects')
    }

    return <ProjectForm onSubmit={handleSubmit} />
}