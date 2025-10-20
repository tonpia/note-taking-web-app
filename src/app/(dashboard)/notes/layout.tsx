import BottomNav from "@/features/notes/components/BottomNav";
import TopBanner from "@/features/notes/components/TopBanner";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <TopBanner />
      {children}
      <BottomNav />
    </div>
  );
}
