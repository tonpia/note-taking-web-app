// src/features/auth/components/AuthLayout.tsx
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-700 transition-colors">
      <ThemeToggle />
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center text-center space-y-4">
        {/* App Logo */}

        <Image
          src="/assets/images/light-logo.svg"
          alt="Light Mode Logo"
          width={80}
          height={40}
          className="dark:hidden"
          priority
        />
        <Image
          src="/assets/images/dark-logo.svg"
          alt="Dark Mode Logo"
          width={80}
          height={40}
          className="hidden dark:block"
          priority
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
