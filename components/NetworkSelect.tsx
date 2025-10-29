"use client";

import Card from "./ui/Card";
import { useChainId } from "wagmi";
import { useMemo } from "react";
import { sepolia, polygonAmoy } from "wagmi/chains";
import { ChainButton } from "./ui/ChainButton";

export default function NetworkSelect() {
  const chainId = useChainId();

  const currentChain =
    chainId === sepolia.id
      ? sepolia
      : chainId === polygonAmoy.id
      ? polygonAmoy
      : null;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Network
          </h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Switch networks to view balances and activity for that chain.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {currentChain ? (
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium leading-none text-gray-700 ring-1 ring-inset ring-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700">
              {currentChain.name}
            </span>
          ) : (
            <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[10px] font-medium leading-none text-red-500 ring-1 ring-inset ring-red-500/20">
              Unknown
            </span>
          )}

          {/* This is a helper button that opens RainbowKit chain selector */}
          <ChainButton />
        </div>
      </div>
    </Card>
  );
}
