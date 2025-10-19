// src/features/auth/components/AuthDivider.tsx
export function AuthDivider() {
  return (
    <div className="flex items-center w-full">
      <div className="flex-grow h-px bg-gray-300 dark:bg-neutral-700" />
      <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
      <div className="flex-grow h-px bg-gray-300 dark:bg-neutral-700" />
    </div>
  );
}
