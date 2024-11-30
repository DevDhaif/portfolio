// src/app/blog/create/page.tsx
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authConfig } from "@/lib/auth";

export default async function CreateBlogPage() {
//   const session = await getServerSession(authConfig);

//   if (!session) {
//     redirect("/login");
//   }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <p>Protected Blog create page</p>
    </div>
  );
}
