import "./globals.css";
import type { Metadata } from "next";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Web3 Identity Dashboard",
  description: "Your on-chain profile, balances and activity in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
