import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthFormField } from "@/features/auth/components/AuthFormField";
import { AuthDivider } from "@/features/auth/components/AuthDivider";
import { AuthGoogle } from "@/features/auth/components/AuthGoogle";
import Image from "next/image";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Sign up to start organizing your notes and boost your productivity."
    >
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
          <Image src="/assets/images/icon-info.svg" alt="" className="h-4"/>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            At least 8 characters
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Sign up
        </button>
      </form>

      <AuthDivider />

      <AuthGoogle buttonText="Sign up with Google"></AuthGoogle>

      <AuthDivider />

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
