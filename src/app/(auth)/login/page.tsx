// src/app/(auth)/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/shared/Container";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authConfig } from "@/lib/auth";

export default async function LoginPage() {
//   const session = await getServerSession(authConfig);

//   if (session) {
//     redirect("/");
//   }

  return (
    <Container className="max-w-md pt-20">
      <div className="rounded-lg border bg-card p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign in to your account
        </h1>
        <LoginForm />
      </div>
    </Container>
  );
}
