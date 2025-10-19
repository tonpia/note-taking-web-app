"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavButtonProps {
  src: string;
  alt: string;
  label: string;
  href: string;
}

export default function NavButton({ src, alt, label, href }: NavButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="flex-1">
      <Link
        href={href}
        aria-label={label}
        className={clsx(
          "flex flex-col items-center justify-center gap-1 w-full h-full p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition",
          isActive
            ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={24}
          height={24}
          className="select-none"
        />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </li>
  );
}
