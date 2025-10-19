// src/features/auth/components/AuthLayout.tsx
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-700 transition-colors">
      {/* <ThemeToggle /> */}
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center text-center space-y-4">
        {/* App Logo */}
        <img
          src="/assets/images/light-logo.svg"
          alt="Note Logo"
          className="w-20 block dark:hidden"
        />
        <img
          src="/assets/images/dark-logo.svg"
          alt="Dark Mode Logo"
          className="w-20 hidden dark:block"
        />
        {/* Title + Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
          {subtitle && (
            <p className="text-neutral-600 dark:text-neutral-300">{subtitle}</p>
          )}
        </div>
        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
