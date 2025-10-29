"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Card from "./ui/Card";

export default function ConnectWalletCard() {
  return (
    <Card className="text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl font-semibold">
          🔐
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Connect wallet to view your profile
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            See balances, tokens, and recent activity across multiple
            test networks.
          </p>
        </div>
        <div>
          <ConnectButton />
        </div>
        <p className="text-[11px] leading-tight text-gray-400 dark:text-gray-600 max-w-[260px]">
          Supported: Ethereum Sepolia &amp; Polygon Amoy. Your data is read
          from chain; no custody, no email login.
        </p>
      </div>
    </Card>
  );
}
