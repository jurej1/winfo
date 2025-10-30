"use client";

import { useAccount } from "wagmi";

import { PortfolioGrid } from "@/components/wallet/portfolio-grid";
import { WalletApprovals } from "@/components/wallet-approvals";

export default function WalletPage() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) return <div>Please connect your wallet...</div>;

  return (
    <div className="m-auto flex max-w-7xl flex-col gap-4 p-2">
      <div className="flex w-full flex-col gap-y-2 rounded-xl bg-white p-4 shadow-lg">
        <PortfolioGrid address={address} chainId={chainId} />
      </div>
      <div className="flex w-full flex-col gap-y-2 rounded-xl bg-white p-4 shadow-lg">
        <WalletApprovals address={address} chainId={chainId} />
      </div>
    </div>
  );
}
