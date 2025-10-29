"use client";

import { useSwapRecentTransactions } from "@/util/hooks/swap/useSwapRecentTransactions";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DexRecentTransactionRow } from "./dex-recent-transaction-row";
import { Spinner } from "../ui/spinner";

export function DexRecentTransactions() {
  const { chainId } = useAccount();

  const { data, isLoading } = useSwapRecentTransactions(chainId);

  return (
    <div className="flex flex-col">
      <p className="text-xl font-bold">Recent Transactions</p>

      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {data && !isLoading && (
        <Table>
          <TableCaption>
            List of most recent transactions performend on our DEX.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Chain ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Gas</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data &&
              data.map((tx) => (
                <DexRecentTransactionRow key={tx.transactionHash} tx={tx} />
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
