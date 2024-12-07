import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { DeleteCertificateButton } from '@/components/DeleteCertificateButton'

export default async function CertificatesPage() {
    const supabase = await createClient()

    const { data: certificates, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching certificates:', error)
    }

    const certificatesWithUrls = certificates?.map(cert => ({
        ...cert,
        sourceIconUrl: cert.source_icon || '',
        certificateImageUrl: cert.image || '',
    }))

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Certificates</h1>
                <Link
                    href="/admin/certificates/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Certificate
                </Link>
            </div>

            <div className="grid gap-6">
                {certificatesWithUrls?.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-start gap-4">
                            {cert.sourceIconUrl && (
                                <div className="w-16 h-16 relative flex-shrink-0">
                                    <Image
                                        src={cert.sourceIconUrl}
                                        alt={cert.source}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                </div>
                            )}
                            {cert.certificateImageUrl && (
                                <div className="w-48 h-32 relative flex-shrink-0">
                                    <Image
                                        src={cert.certificateImageUrl}
                                        alt={cert.title}
                                        width={192}
                                        height={128}
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold">{cert.title}</h2>
                                        <p className="text-gray-600 mt-1">{cert.description}</p>

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {cert.skills?.map((skill: string) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-2 text-sm text-gray-500">
                                            {cert.credential_id && <p>Credential ID: {cert.credential_id}</p>}
                                            {cert.issue_date && <p>Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>}
                                            <p>Source: {cert.source}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/certificates/${cert.id}/edit`}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteCertificateButton certificateId={cert.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
