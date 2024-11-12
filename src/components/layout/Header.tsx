// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold">
            Your Name
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            {status === "authenticated" ? (
              <Button variant="ghost" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
