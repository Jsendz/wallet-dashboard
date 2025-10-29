"use client";

import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Helper to toggle between light/dark based on the actual active theme
  const handleToggleTheme = () => {
    if (!mounted) return;
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: logo + name */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-card" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Web3 Identity Dashboard
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              multi-chain • testnet
            </span>
          </div>
        </div>

        {/* Right: theme toggle + wallet */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={handleToggleTheme}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {resolvedTheme === "dark" ? "☀︎ Light" : "🌙 Dark"}
            </button>
          )}

          <ConnectButton
            showBalance={false}
            accountStatus="address"
            chainStatus="icon"
          />
        </div>
      </div>
    </header>
  );
}
