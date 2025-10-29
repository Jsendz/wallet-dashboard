"use client";

import { useAccount } from "wagmi";
import Header from "./Header";
import ConnectWalletCard from "./ConnectWalletCard";
import DashboardGrid from "./DashboardGrid";

export default function Dashboard() {
  const { isConnected } = useAccount();

  return (
    <>
      <Header />
      <section className="w-full max-w-7xl mx-auto px-4 pb-24 pt-6 md:pt-10">
        {isConnected ? (
          <DashboardGrid />
        ) : (
          <div className="max-w-lg mx-auto">
            <ConnectWalletCard />
          </div>
        )}
      </section>
    </>
  );
}
