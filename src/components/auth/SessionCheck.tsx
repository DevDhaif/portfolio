// src/components/auth/SessionCheck.tsx
"use client";

// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SessionCheck({ children }: { children: React.ReactNode }) {
    //   const { status } = useSession();
    //   const router = useRouter();

    //   useEffect(() => {
    //     if (status === "unauthenticated") {
    //       router.push("/login");
    //     }
    //   }, [status, router]);

    //   if (status === "loading") {
    //     return <div>Loading...</div>;
    //   }

    //   if (status === "authenticated") {
    return <>{children}</>;
    //   }

    //   return null;
}
