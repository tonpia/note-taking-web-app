"use client"

import { useRouter } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthFormField } from "@/features/auth/components/AuthFormField";

export default function ForgotPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ... you can validate or call API here later
    router.push("/reset");
  };
  
  return (
    <AuthLayout
      title="Forgotten your password?"
      subtitle="Enter your email below, and we'll send you a link to reset it."
    >
      <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
        <AuthFormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}
