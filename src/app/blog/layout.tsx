import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Field notes on web engineering',
  description:
    'Articles, deep-dives, and practical notes on React, Next.js, TypeScript, and modern frontend architecture.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
