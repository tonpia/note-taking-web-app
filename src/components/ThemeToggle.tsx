"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // see note below

  useEffect(() => setMounted(true), []);

  // NOTE: mounted check is optional if you’re using `data-theme`
  // but it’s still useful to ensure systemTheme exists during runtime
  if (!mounted) return null;

  const activeTheme = theme === "system" ? systemTheme : theme;
  const nextTheme = activeTheme === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(nextTheme!)}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {activeTheme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
