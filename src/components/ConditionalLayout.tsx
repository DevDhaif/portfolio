'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Noise } from '@/components/ui/noise';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is admin or auth related
  const isAdminOrAuth = pathname?.startsWith('/admin') || 
                        pathname?.startsWith('/login') || 
                        pathname?.startsWith('/auth') ||
                        pathname?.startsWith('/private');

  if (isAdminOrAuth) {
    // Render only children for admin/auth pages (no Header/Footer)
    return <>{children}</>;
  }

  // Render full layout for public pages
  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
        <Noise />

        {/* Gradient blob */}
        <div className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] animate-[spin_100s_linear_infinite] bg-[radial-gradient(var(--accent)/4%,transparent_70%)]" />

        {/* Background glow spots */}
        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full  /10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
