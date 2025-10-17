"use client";

import { WalletNotConnected } from "@/components/wallet-not-connected";
import { useAccount } from "wagmi";

export default function Page() {
  const { isConnected } = useAccount();

  if (!isConnected) return <WalletNotConnected />;

  return <div>Wallet info page</div>;
}
