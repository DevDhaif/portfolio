import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }

  // Handle cover image URL
  let coverImage = post.cover_image;
  if (coverImage && !coverImage.startsWith('http')) {
    coverImage = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-content/${coverImage}`;
  }

  // Process tags
  let tags: string[] = [];
  if (typeof post.tags === 'string') {
    try {
      tags = JSON.parse(post.tags);
    } catch {
      tags = post.tags.split(',').map((t: string) => t.trim());
    }
  } else if (Array.isArray(post.tags)) {
    tags = post.tags;
  }

  return {
    metadataBase: new URL('https://devdhaif.vercel.app'),
    title: post.title,
    description: post.description,
    keywords: [
      ...tags,
      'Dhaifallah Alfarawi',
      'Devdhaif',
      'Blog',
      'Web Development',
      'Programming',
      'Tutorial',
    ],
    authors: [
      { name: 'Dhaifallah Alfarawi', url: 'https://devdhaif.vercel.app' },
    ],
    creator: 'Dhaifallah Alfarawi',
    publisher: 'Dhaifallah Alfarawi',
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://devdhaif.vercel.app/blog/${post.slug}`,
      siteName: 'Dhaifallah Alfarawi Blog',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: ['Dhaifallah Alfarawi'],
      tags: tags,
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
              type: 'image/png',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@devdhaif',
      creator: '@devdhaif',
      title: post.title,
      description: post.description,
      images: coverImage ? [coverImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://devdhaif.vercel.app/blog/${post.slug}`,
    },
  };
}
