"use client";

import ReadOnlyProfileCard from "./readonly/ReadOnlyProfileCard";
import ReadOnlyPortfolioCard from "./readonly/ReadOnlyPortfolioCard";
import ReadOnlyTxHistoryCard from "./readonly/ReadOnlyTxHistoryCard";
import ReadOnlyNftGalleryCard from "./readonly/ReadOnlyNftGalleryCard";
import NetworkSelect from "./NetworkSelect";

export default function WatchDashboardGrid({
  address,
  ensName,
}: {
  address: string;
  ensName: string | null;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Left column */}
      <div className="flex flex-col gap-6">
        <ReadOnlyProfileCard address={address} ensName={ensName} />
        <NetworkSelect />
        <ReadOnlyNftGalleryCard address={address} />
      </div>

      {/* Middle */}
      <div className="flex flex-col gap-6">
        <ReadOnlyPortfolioCard address={address} />
      </div>

      {/* Right */}
      <div className="flex flex-col gap-6 lg:col-span-1 md:col-span-2 lg:row-span-2">
        <ReadOnlyTxHistoryCard address={address} />
      </div>
    </div>
  );
}
