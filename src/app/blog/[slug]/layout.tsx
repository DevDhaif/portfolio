import { generatePostMetadata } from "./blog-post";

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return await generatePostMetadata({ params });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}