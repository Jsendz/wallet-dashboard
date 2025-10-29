"use client";

import ProfileCard from "./ProfileCard";
import NetworkSelect from "./NetworkSelect";
import PortfolioCard from "./PortfolioCard";
import TxHistoryCard from "./TxHistoryCard";

export default function DashboardGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Left column stack */}
      <div className="flex flex-col gap-6">
        <ProfileCard />
        <NetworkSelect />
      </div>

      {/* Middle column */}
      <div className="flex flex-col gap-6">
        <PortfolioCard />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-6 lg:col-span-1 md:col-span-2 lg:row-span-2">
        <TxHistoryCard />
      </div>
    </div>
  );
}
