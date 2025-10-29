"use client";

import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [lookupValue, setLookupValue] = useState("");
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleToggleTheme = () => {
    if (!mounted) return;
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleViewWallet = () => {
    if (!lookupValue.trim()) return;
    // push to /address/[addrOrEns]
    router.push(`/address/${encodeURIComponent(lookupValue.trim())}`);
    setLookupValue("");
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left cluster: brand + search */}
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:gap-4">
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

          {/* Watch Wallet search bar */}
          <div className="flex w-full max-w-xs items-center gap-2">
            <input
              value={lookupValue}
              onChange={(e) => setLookupValue(e.target.value)}
              placeholder="0xabc... or vitalik.eth"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-indigo-400"
            />
            <button
              onClick={handleViewWallet}
              className="rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              View
            </button>
          </div>
        </div>

        {/* Right cluster: theme + connect */}
        <div className="flex items-center gap-3 self-end md:self-auto">
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
