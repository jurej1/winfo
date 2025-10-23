"use client";
import { TransactionsTable } from "@/components/transactions-table";
import { useWalletHistory } from "@/util/api/hooks/useWalletHistory";
import { useAccount } from "wagmi";

export function TransactionsPage() {
  const { address } = useAccount();

  if (!address) return <h1>not defined...</h1>;

  const { data, isLoading, isError } = useWalletHistory(address);

  if (isLoading || !data) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    return <div>There was an error loading transactions</div>;
  }

  return <TransactionsTable transactions={data.result} />;
}
