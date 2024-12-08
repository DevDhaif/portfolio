
"use client";

import Link from "next/link";


import { Container } from "@/components/shared/Container";

export function Header() {

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="font-bold">
                        Dhaifallah
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/projects">Projects</Link>
                        <Link href="/blog">Blog</Link>
                        {/* {status === "authenticated" ? (
                            <Button variant="ghost" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        ) : (
                            <Link href="/login">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                        )} */}
                    </nav>
                </div>
            </Container>
        </header>
    );
}
