import { use } from 'react'
import { generateMetadata } from './generateMetadata'
import BlogPost from './BlogPost'  // Changed this line

export { generateMetadata }

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    return <BlogPost params={params} />
}