// src/components/auth/LoginForm.tsx
"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Button } from "@/components/shared/Button";

// interface LoginFormData {
//   email: string;
//   password: string;
// }

export function LoginForm() {
    //   const router = useRouter();
    //   const [isLoading, setIsLoading] = useState(false);

    //   const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm<LoginFormData>();

    //   const onSubmit = async (data: LoginFormData) => {
    //     try {
    //       setIsLoading(true);
    //       const result = await signIn("credentials", {
    //         email: data.email,
    //         password: data.password,
    //         redirect: false,
    //       });

    //       if (result?.error) {
    //         toast.error("Invalid credentials");
    //         return;
    //       }

    //       router.push("/");
    //       router.refresh();
    //     } catch (error: unknown) {
    //       console.error(error); // Log the error if needed
    //       toast.error("Something went wrong");
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    return (
        <h1>login page</h1>
        // <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        //   <div>
        //     <label htmlFor="email" className="block text-sm font-medium">
        //       Email
        //     </label>
        //     <input
        //       {...register("email", { required: "Email is required" })}
        //       type="email"
        //       className="mt-1 block w-full rounded-md border p-2"
        //     />
        //     {errors.email && (
        //       <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        //     )}
        //   </div>

        //   <div>
        //     <label htmlFor="password" className="block text-sm font-medium">
        //       Password
        //     </label>
        //     <input
        //       {...register("password", { required: "Password is required" })}
        //       type="password"
        //       className="mt-1 block w-full rounded-md border p-2"
        //     />
        //     {errors.password && (
        //       <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        //     )}
        //   </div>

        //   <Button type="submit" className="w-full" disabled={isLoading}>
        //     {isLoading ? "Signing in..." : "Sign in"}
        //   </Button>
        // </form>
    );
}
