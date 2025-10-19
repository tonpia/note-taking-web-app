interface AuthGoogleProps {
  buttonText: string;
}

export function AuthGoogle({ buttonText }: AuthGoogleProps) {
  return (
    <div className="w-full">
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-neutral-700 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 block dark:hidden" />
        <img src="/assets/images/dark-google.svg" alt="Google" className="w-5 h-5 hidden dark:block" />
        <span className="text-gray-700 dark:text-gray-200 font-medium">
          {buttonText}
        </span>
      </button>
    </div>
  );
}
