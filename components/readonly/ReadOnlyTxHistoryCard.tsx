"use client";

import Card from "../ui/Card";
import SkeletonCard from "../ui/SkeletonCard";
import { useState, useEffect } from "react";
import { useChainId } from "wagmi";
import { shortenHash } from "@/lib/format";
import { getTxExplorerUrl } from "@/lib/explorer";

type TxItem = {
  hash: string;
  direction: "in" | "out";
  summary: string;
  age: string;
  status: "success" | "pending" | "failed";
};

export default function ReadOnlyTxHistoryCard({
  address,
}: {
  address: string;
}) {
  const chainId = useChainId();
  const [loading, setLoading] = useState(true);
  const [txs, setTxs] = useState<TxItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError(null);

    const mockTxs: TxItem[] = [
      {
        hash: "0x1111abcd...111",
        direction: "out",
        summary: "Sent 0.05 ETH",
        age: "4h ago",
        status: "success",
      },
      {
        hash: "0x2222abcd...222",
        direction: "in",
        summary: "Received 250 USDC",
        age: "1d ago",
        status: "success",
      },
    ];

    const t = setTimeout(() => {
      setTxs(mockTxs);
      setLoading(false);
    }, 500);

    return () => clearTimeout(t);
  }, [address, chainId]);

  if (loading) {
    return <SkeletonCard title="Recent Activity" lines={5} />;
  }

  if (error) {
    return (
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>
        <p className="mt-2 text-xs text-red-500">
          Could not load transactions for {address.slice(0, 6)}…
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Recent Activity
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        Last transactions for this wallet.
      </p>

      <ul className="mt-4 space-y-3">
        {txs.map((tx, idx) => {
          const txUrl = getTxExplorerUrl(chainId, tx.hash);
          return (
            <li
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-3 text-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {tx.summary}
                    </span>
                    <StatusBadge status={tx.status} />
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {tx.direction === "out" ? "Sent" : "Received"} · {tx.age}
                  </span>
                </div>

                <div className="text-right text-[11px] text-gray-500 dark:text-gray-400 break-all max-w-[120px]">
                  <span className="font-mono">{shortenHash(tx.hash)}</span>
                  {txUrl && (
                    <a
                      href={txUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 underline decoration-dotted hover:text-indigo-500 dark:hover:text-indigo-400"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {txs.length === 0 && (
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          No recent transactions.
        </div>
      )}
    </Card>
  );
}

function StatusBadge({
  status,
}: {
  status: "success" | "pending" | "failed";
}) {
  const map = {
    success:
      "bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20",
    pending:
      "bg-yellow-500/10 text-yellow-500 ring-1 ring-inset ring-yellow-500/20",
    failed:
      "bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20",
  } as const;
  const label = {
    success: "Success",
    pending: "Pending",
    failed: "Failed",
  }[status];

  return (
    <span
      className={`rounded px-2 py-0.5 text-[10px] font-medium leading-none ${map[status]}`}
    >
      {label}
    </span>
  );
}
