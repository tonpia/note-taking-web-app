"use client";

import { useRouter } from "next/navigation";

import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthFormField } from "@/features/auth/components/AuthFormField";
import { AuthDivider } from "@/features/auth/components/AuthDivider";
import { AuthGoogle } from "@/features/auth/components/AuthGoogle";
import { on } from "events";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ... you can validate or call API here later
    router.push("/notes");
  };

  return (
    <AuthLayout title="Welcome to Note" subtitle="Please log in to continue">
      <form className="w-full text-left space-y-4">
        <AuthFormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <div className="flex items-center gap-x-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <a href="/forgot" className="hover:underline">
              Forgot Password
            </a>
          </p>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Log In
        </button>
      </form>

      <AuthDivider />

      <AuthGoogle buttonText="Login with Google"></AuthGoogle>

      <AuthDivider />

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          No account yet?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign Up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
