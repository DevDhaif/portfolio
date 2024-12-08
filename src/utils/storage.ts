
export function getStorageImagePath(filename: string) {

    if (filename.startsWith('http')) {
        return filename.split('/').pop() || filename
    }
    return filename
}





