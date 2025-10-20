import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function TopBanner() {
  return (
    <header className="sticky top-0 z-10 flex items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 px-4">
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
      <ThemeToggle/>
    </header>
  );
}
