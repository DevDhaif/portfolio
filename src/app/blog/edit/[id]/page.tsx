// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth";

export default async function EditBlogPage() {
//   const session = await getServerSession(authConfig);

//   if (!session) {
//     redirect("/login");
//   }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <p>Protected Blog edit page</p>
    </div>
  );
}
