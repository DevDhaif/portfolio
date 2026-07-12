'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { CursorRing } from '@/components/ui/cursor-ring';
import { ConsoleGreeting } from '@/components/ui/console-greeting';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isBareLayout =
    pathname === '/' ||                 // landing picker (self-contained)
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/private') ||
    pathname?.startsWith('/note') ||    // notebook theme (self-contained)
    pathname?.startsWith('/pro/ar');    // arabic pro theme (self-contained)

  if (isBareLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <ConsoleGreeting />
      <ScrollProgress />
      <CursorRing />
      <div className="relative flex min-h-screen flex-col bg-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
