"use client";

import { useAccount } from "wagmi";

import { PortfolioGrid } from "@/components/wallet/portfolio-grid";
import { WalletApprovals } from "@/components/wallet-approvals";
import { WalletDisconnected } from "@/components/ui/wallet-disconnected";

export default function WalletPage() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) {
    return (
      <WalletDisconnected
        title="Wallet Not Connected"
        message="Connect your wallet to view your portfolio, token holdings, and manage approvals"
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <PortfolioGrid address={address} chainId={chainId} />
      <WalletApprovals address={address} chainId={chainId} />
    </div>
  );
}
