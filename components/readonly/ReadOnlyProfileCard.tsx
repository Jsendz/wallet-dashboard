"use client";

import Card from "../ui/Card";
import { shortenAddress } from "@/lib/format";
import { useEnsAvatar } from "wagmi";
import { useChainId } from "wagmi";
import { getAddressExplorerUrl } from "@/lib/explorer";
import { useState } from "react";

export default function ReadOnlyProfileCard({
  address,
  ensName,
}: {
  address: string;
  ensName: string | null;
}) {
  const chainId = useChainId();
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
  });

  const [copied, setCopied] = useState(false);

  const displayName = ensName || shortenAddress(address);
  const explorerUrl = getAddressExplorerUrl(chainId, address);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="relative">
          {ensAvatar ? (
            <img
              src={ensAvatar}
              alt="avatar"
              className="h-12 w-12 rounded-full ring-2 ring-indigo-500/40"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 ring-2 ring-indigo-500/40 flex items-center justify-center text-xs font-semibold text-white">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 break-all">
              {displayName}
            </span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium leading-none text-gray-700 ring-1 ring-inset ring-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700">
              Read-only
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 break-all">
            {address}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={handleCopy}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {copied ? "Copied ✓" : "Copy address"}
            </button>

            {explorerUrl ? (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                View on Explorer ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
