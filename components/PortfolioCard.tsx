"use client";

import Card from "./ui/Card";
import SkeletonCard from "./ui/SkeletonCard";
import { formatCurrency, formatTokenAmount } from "@/lib/format";
import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";

type TokenBalance = {
  symbol: string;
  amount: number;
  usdPrice: number;
  logo?: string;
};

export default function PortfolioCard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [error, setError] = useState<string | null>(null);

  // mock fetch effect
  useEffect(() => {
    if (!isConnected || !address) return;
    setLoading(true);
    setError(null);

    // pretend we fetched from chain & coingecko
    const mockPortfolio: TokenBalance[] = [
      { symbol: "ETH", amount: 0.12345, usdPrice: 3200 },
      { symbol: "USDC", amount: 42.5, usdPrice: 1 },
    ];

    // fake latency for skeleton demo
    const t = setTimeout(() => {
      setTokens(mockPortfolio);
      setLoading(false);
    }, 500);

    return () => clearTimeout(t);
  }, [isConnected, address, chainId]);

  if (!isConnected || !address) return null;

  if (loading) {
    return (
      <SkeletonCard
        title="Portfolio"
        lines={4}
      />
    );
  }

  if (error) {
    return (
      <Card>
        <div className="flex flex-col rounded-xl">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Portfolio
          </h2>
          <p className="mt-2 text-xs text-red-500">
            Could not load balances. Please refresh or switch network.
          </p>
        </div>
      </Card>
    );
  }

  // compute totals
  const rows = tokens.map((t) => {
    const value = t.amount * t.usdPrice;
    return {
      ...t,
      value,
    };
  });

  const totalValue = rows.reduce((acc, r) => acc + r.value, 0);

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Portfolio
          </h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Token balances &amp; estimated USD value.
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(totalValue)}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            across {tokens.length} assets
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-3 py-2 font-medium">Token</th>
              <th className="px-3 py-2 font-medium text-right">Balance</th>
              <th className="px-3 py-2 font-medium text-right">Value (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-semibold text-gray-700 dark:text-gray-200">
                      {row.symbol}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {row.symbol}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">
                        ${row.usdPrice.toFixed(2)} / {row.symbol}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-right align-top text-xs text-gray-900 dark:text-gray-100">
                  {formatTokenAmount(row.amount)}
                </td>
                <td className="px-3 py-3 text-right align-top text-xs text-gray-900 dark:text-gray-100">
                  {formatCurrency(row.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
