import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-700">
      <ThemeToggle />
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center text-center space-y-4">
        <img
          src={"/assets/images/light-logo.svg"}
          alt="Note Logo"
          className="w-20 block dark:hidden"
        ></img>
        <img
          src="/assets/images/dark-logo.svg"
          alt="Dark Mode Logo"
          className="w-20 hidden dark:block"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Note
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Please Log in to continue
          </p>
        </div>

        {/* Form Section */}
        <form className="w-full text-left space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full">
          <div className="flex-grow h-px bg-gray-300 dark:bg-neutral-700" />
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-neutral-700" />
        </div>

        {/* Third-party Login */}
        <div className="w-full">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-neutral-700 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
            <img
              src="/assets/icons/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Log in with Google
            </span>
          </button>
        </div>

        {/* Signup Link */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            No account yet?{" "}
            <button className="text-blue-600 hover:underline dark:text-blue-400">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}