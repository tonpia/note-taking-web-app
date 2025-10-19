// src/features/auth/components/AuthFormField.tsx
import { InputHTMLAttributes } from "react";

interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export function AuthFormField({
  id,
  label,
  type = "text",
  placeholder,
  ...props
}: AuthFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        {...props}
      />
    </div>
  );
}
