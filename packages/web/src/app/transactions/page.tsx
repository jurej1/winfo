"use client";

import TransactionsPage from "@/components/pages/transactions-page";
import { useAccount } from "wagmi";

export default function Page() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) return <div>not defined...</div>;
  return <TransactionsPage chainId={chainId} address={address} />;
}
