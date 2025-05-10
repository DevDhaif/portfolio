import { generateMetadata } from './generateMetadata'
import BlogPost from './BlogPost'

export { generateMetadata }

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    return <BlogPost params={params} />
}