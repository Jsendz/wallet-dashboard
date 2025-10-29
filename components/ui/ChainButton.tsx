"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ChainButton() {
  return (
    <ConnectButton.Custom>
      {({
        chain,
        openChainModal,
        mounted,
      }) => {
        const ready = mounted;
        if (!ready) return null;

        return (
          <button
            onClick={openChainModal}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[12px] font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {chain?.name ? `Switch (${chain.name})` : "Select chain"}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
