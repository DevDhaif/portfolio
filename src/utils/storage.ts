// utils/storage.ts
export function getStorageImagePath(filename: string) {
    // If it's already a full URL, extract just the filename
    if (filename.startsWith('http')) {
        return filename.split('/').pop() || filename
    }
    return filename
}

// Then in your projects page:
const { data: { publicUrl: mainImageUrl } } = supabase
    .storage
    .from('projects-images')
    .getPublicUrl(getStorageImagePath(project.main_image))