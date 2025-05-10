"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import Image from "next/image";

export default function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [sourceIcon, setSourceIcon] = useState<File[]>([]);
    const [certificateImage, setCertificateImage] = useState<File[]>([]);
    const [certificateData, setCertificateData] = useState({
        title: "",
        description: "",
        skills: "",
        credentialId: "",
        issueDate: "",
        source: "",
        urlLink: "",
        sourceIconUrl: "",
        certificateImageUrl: "",
    });
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        let mounted = true;

        async function loadCertificate() {
            try {
                const { data, error } = await supabase
                    .from("certificates")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching certificate:", error);
                    return;
                }

                if (mounted && data) {
                    setCertificateData({
                        title: data.title || "",
                        description: data.description || "",
                        skills: (data.skills || []).join(", "),
                        credentialId: data.credential_id || "",
                        issueDate: data.issue_date?.split("T")[0] || "",
                        source: data.source || "",
                        urlLink: data.url_link || "",
                        sourceIconUrl: data.source_icon || "",
                        certificateImageUrl: data.image || "",
                    });
                }
            } catch (error) {
                console.error("Error loading certificate:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadCertificate();

        return () => {
            mounted = false;
        };
    }, [id, supabase]);

    async function handleSubmit(formData: FormData) {
        try {
            let sourceIconUrl = certificateData.sourceIconUrl;
            let certificateImageUrl = certificateData.certificateImageUrl;


            if (sourceIcon.length > 0) {
                if (certificateData.sourceIconUrl) {
                    await supabase.storage.from("certificates-icons").remove([certificateData.sourceIconUrl]);
                }

                const fileName = `${Date.now()}-${sourceIcon[0].name}`;
                const { error: uploadError } = await supabase.storage
                    .from("certificates-icons")
                    .upload(fileName, sourceIcon[0]);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from("certificates-icons")
                    .getPublicUrl(fileName);

                sourceIconUrl = data?.publicUrl || "";
            }


            if (certificateImage.length > 0) {
                if (certificateData.certificateImageUrl) {
                    await supabase.storage.from("certificates-images").remove([certificateData.certificateImageUrl]);
                }

                const fileName = `${Date.now()}-${certificateImage[0].name}`;
                const { error: uploadError } = await supabase.storage
                    .from("certificates-images")
                    .upload(fileName, certificateImage[0]);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from("certificates-images")
                    .getPublicUrl(fileName);

                certificateImageUrl = data?.publicUrl || "";
            }


            const source = formData.get("source");
            if (!source || source.toString().trim() === "") {
                throw new Error("Source is required and cannot be empty.");
            }


            const { error } = await supabase
                .from("certificates")
                .update({
                    title: formData.get("title"),
                    description: formData.get("description"),
                    skills: formData
                        .get("skills")
                        ?.toString()
                        .split(",")
                        .map((s) => s.trim()),
                    credential_id: formData.get("credentialId"),
                    issue_date: formData.get("issueDate"),
                    source: source.toString().trim(),
                    url_link: formData.get("urlLink"),
                    source_icon: sourceIconUrl,
                    image: certificateImageUrl,
                })
                .eq("id", id);

            if (error) throw error;

            router.push("/admin/certificates");
            router.refresh();
        } catch (error) {
            console.error("Error updating certificate:", error);
            alert("Error updating certificate. Please try again.");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Certificate</h1>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={certificateData.title}
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
                        defaultValue={certificateData.description}
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
                        defaultValue={certificateData.skills}
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
                        defaultValue={certificateData.credentialId}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <input
                    type="text"
                    id="source"
                    name="source"
                    value={certificateData.source}
                    onChange={(e) =>
                        setCertificateData({ ...certificateData, source: e.target.value })
                    }
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                        Issue Date *
                    </label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        defaultValue={certificateData.issueDate}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Source Icon</label>
                    {certificateData.sourceIconUrl && (
                        <div className="mt-2">
                            <Image
                                src={certificateData.sourceIconUrl}
                                alt="Source Icon"
                                width={100}
                                height={100}
                                className="rounded-md"
                            />
                        </div>
                    )}
                    <ImageUpload
                        value={sourceIcon}
                        onChange={setSourceIcon}
                        maxFiles={1}
                        bucket="certificates-icons"
                    />
                </div>

                {/* Certificate Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Certificate Image</label>
                    {certificateData.certificateImageUrl && (
                        <div className="mt-2">
                            <Image
                                src={certificateData.certificateImageUrl}
                                alt="Certificate Image"
                                width={200}
                                height={150}
                                className="rounded-md"
                            />
                        </div>
                    )}
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
                        defaultValue={certificateData.urlLink}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/certificates" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                        Cancel
                    </Link>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Update Certificate
                    </button>
                </div>
            </form>
        </div>
    );
}
