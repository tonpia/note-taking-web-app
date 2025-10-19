import Image from "next/image";

interface AuthGoogleProps {
  buttonText: string;
}

export function AuthGoogle({ buttonText }: AuthGoogleProps) {
  return (
    <div className="w-full">
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-neutral-700 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
        <Image
          src="/assets/images/google.svg"
          alt="Light Mode Google"
          width={20}
          height={20}
          className="dark:hidden"
          priority
        />
        <Image
          src="/assets/images/dark-google.svg"
          alt="Dark Mode Google"
          width={20}
          height={20}
          className="hidden dark:block"
          priority
        />
        <span className="text-gray-700 dark:text-gray-200 font-medium">
          {buttonText}
        </span>
      </button>
    </div>
  );
}
