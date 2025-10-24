"use client";

import { useAccount } from "wagmi";

import { toast } from "sonner";
import { PortfolioGrid } from "@/components/wallet/portfolio-grid";

export function WalletPage() {
  const { address } = useAccount();

  if (!address) return <div>Please connect your wallet...</div>;

  return (
    <div className="m-auto flex max-w-7xl p-2">
      <div className="flex w-full flex-col gap-y-2 rounded-xl bg-white p-4 shadow-lg">
        <PortfolioGrid address={address} />
      </div>
    </div>
  );
}
