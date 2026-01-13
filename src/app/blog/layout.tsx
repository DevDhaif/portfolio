import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';
import '@/styles/blog-theme.css';

export const metadata: Metadata = {
  title: 'Blog - Professional Insights & Tutorials',
  description:
    'Explore articles, tutorials, and insights about web development, design patterns, and modern technologies.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-theme min-h-screen bg-white">
      {/* Blog Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-300 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="flex items-center gap-3 text-slate-900 hover:text-blue-600 transition-colors font-bold text-lg"
            >
              <BookOpen className="w-6 h-6" />
              <span>Blog</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 !text-white hover:bg-slate-800 transition-all font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative bg-slate-50">
        <div className="relative">{children}</div>
      </main>

      {/* Blog Footer */}
      <footer className="mt-20 border-t border-slate-300 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 text-sm font-medium">
              © {new Date().getFullYear()} Blog. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
              >
                All Posts
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
