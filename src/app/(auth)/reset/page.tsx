import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthFormField } from "@/features/auth/components/AuthFormField";

export default function ResetPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Choose a new password to secure your account"
    >
      <form className="w-full text-left space-y-4">
        <AuthFormField
          id="password"
          label="New Password"
          type="password"
          placeholder="••••••••"
          required
        />
        <AuthFormField
          id="password"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}
