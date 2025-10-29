"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import WatchDashboard from "@/components/WatchDashboard";

export default function AddressPage() {
  const params = useParams<{ addr: string }>();

  // The param can be an ENS name or a hex address.
  // WatchDashboard will resolve and render.
  return (
    <>
      <Header />
      <section className="w-full max-w-7xl mx-auto px-4 pb-24 pt-6 md:pt-10">
        <WatchDashboard inputAddressOrEns={params.addr} />
      </section>
    </>
  );
}
