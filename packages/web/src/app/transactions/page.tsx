"use client";

import TransactionsPage from "@/components/pages/transactions-page";
import { WalletDisconnected } from "@/components/ui/wallet-disconnected";
import { useAccount } from "wagmi";

export default function Page() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) {
    return (
      <WalletDisconnected
        title="Wallet Not Connected"
        message="Connect your wallet to view your transaction history and track all your on-chain activity"
      />
    );
  }

  return <TransactionsPage chainId={chainId} address={address} />;
}
