"use client";

import { TransactionsPage } from "@/pages/transactions-page";
import { useAccount } from "wagmi";

export default function Page() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) return <div>not defined...</div>;
  return (
    <div className="mx-auto flex w-full max-w-[1580px]">
      <TransactionsPage chainId={chainId} address={address} />
    </div>
  );
}
