"use client";

import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { useEnsAddress, useEnsName, useEnsAvatar } from "wagmi";
import WatchDashboardGrid from "./WatchDashboardGrid";

type Props = {
  inputAddressOrEns: string;
};

export default function WatchDashboard({ inputAddressOrEns }: Props) {
  // We'll try to detect if input is an ENS or an address.
  // If it's an ENS -> resolve to address.
  // If it's an address -> resolve ENS name.
  // We'll show loading state while resolving.

  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
  const [resolvedEnsName, setResolvedEnsName] = useState<string | null>(null);
  const [loadingResolve, setLoadingResolve] = useState(true);

  // wagmi hooks:
  // If user typed ENS, we can resolve to address:
  const { data: ensToAddr } = useEnsAddress({
    name: inputAddressOrEns,
    chainId: 1, // mainnet resolution for ENS
    query: { enabled: inputAddressOrEns.endsWith(".eth") },
  });

  // If user typed address, we can resolve ENS:
  const { data: addrToEns } = useEnsName({
    address: isAddress(inputAddressOrEns)
      ? (inputAddressOrEns as `0x${string}`)
      : undefined,
    chainId: 1,
    query: { enabled: isAddress(inputAddressOrEns) },
  });

  // You could also get avatar, but we'll just handle it in subcomponents.

  useEffect(() => {
    // Step 1: try ENS -> address
    if (inputAddressOrEns.endsWith(".eth")) {
      if (ensToAddr) {
        setResolvedAddress(ensToAddr);
        setResolvedEnsName(inputAddressOrEns);
        setLoadingResolve(false);
      } else {
        // still resolving or failed
        if (!ensToAddr) setLoadingResolve(false);
      }
      return;
    }

    // Step 2: if it's an address
    if (isAddress(inputAddressOrEns)) {
      setResolvedAddress(inputAddressOrEns);
      setResolvedEnsName(addrToEns ?? null);
      setLoadingResolve(false);
      return;
    }

    // Fallback: invalid
    setResolvedAddress(null);
    setResolvedEnsName(null);
    setLoadingResolve(false);
  }, [inputAddressOrEns, ensToAddr, addrToEns]);

  if (loadingResolve) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Resolving address…
      </div>
    );
  }

  if (!resolvedAddress) {
    return (
      <div className="text-sm text-red-500">
        Could not resolve “{inputAddressOrEns}”.
      </div>
    );
  }

  return (
    <WatchDashboardGrid
      address={resolvedAddress}
      ensName={resolvedEnsName}
    />
  );
}
