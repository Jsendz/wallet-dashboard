"use client";

import Card from "../ui/Card";
import SkeletonCard from "../ui/SkeletonCard";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

type NftItem = {
  name: string;
  image: string;
  collection: string;
};

export default function ReadOnlyNftGalleryCard({
  address,
}: {
  address: string;
}) {
  const chainId = useChainId();

  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<NftItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError(null);

    const mockNfts: NftItem[] = [
      {
        name: "VIP Cat #001",
        collection: "VIP Cats",
        image:
          "https://via.placeholder.com/300x300.png?text=VIP+Cat+%23001",
      },
    ];

    const t = setTimeout(() => {
      setNfts(mockNfts);
      setLoading(false);
    }, 400);

    return () => clearTimeout(t);
  }, [address, chainId]);

  if (loading) {
    return <SkeletonCard title="NFTs" lines={3} />;
  }

  if (error) {
    return (
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          NFTs
        </h2>
        <p className="mt-2 text-xs text-red-500">
          Could not load NFTs for {address.slice(0, 6)}…
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            NFTs
          </h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Displaying latest collectibles for this wallet.
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nfts.length}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            owned
          </div>
        </div>
      </div>

      {nfts.length === 0 ? (
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          No NFTs found for this wallet.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {nfts.map((nft, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900 shadow-sm"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 truncate text-[11px] font-medium text-gray-900 dark:text-gray-100">
                {nft.name}
              </div>
              <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                {nft.collection}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
