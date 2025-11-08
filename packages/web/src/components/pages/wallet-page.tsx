"use client";

import { useAccount } from "wagmi";

import { PortfolioGrid } from "@/components/wallet/portfolio-grid";
import { WalletApprovals } from "@/components/wallet-approvals";

export default function WalletPage() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) {
    return (
      <div className="mx-auto mt-8 max-w-7xl px-4">
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-base font-medium text-neutral-600">
            Please connect your wallet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <PortfolioGrid address={address} chainId={chainId} />
      <WalletApprovals address={address} chainId={chainId} />
    </div>
  );
}
