"use client";

import { useSwapRecentTransactions } from "@/util/hooks/swap/useSwapRecentTransactions";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DexRecentTransactionRow } from "./dex-recent-transaction-row";
import { LoadingCard } from "../ui/loading-card";
import { MdHistory } from "react-icons/md";

export function DexRecentTransactions() {
  const { chainId } = useAccount();

  const { data, isLoading } = useSwapRecentTransactions(chainId);

  if (isLoading) {
    return <LoadingCard message="Loading Recent Transactions..." />;
  }

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <MdHistory className="h-5 w-5 text-neutral-500" />
          <h3 className="text-base font-semibold text-primary-dark-900">
            Recent DEX Transactions
          </h3>
        </div>
        <p className="text-sm text-neutral-600">
          Latest swaps performed on the decentralized exchange
          {data && ` (${data.length} transaction${data.length !== 1 ? 's' : ''})`}
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-neutral-200">
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-200 bg-neutral-50 hover:bg-neutral-50">
                <TableHead className="font-medium text-neutral-600">
                  Transaction
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Chain
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Status
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Route
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Fee
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((tx) => (
                <DexRecentTransactionRow key={tx.transactionHash} tx={tx} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <MdHistory className="mb-4 h-12 w-12 text-neutral-300" />
            <p className="text-base font-medium text-neutral-900">
              No transactions yet
            </p>
            <p className="text-sm text-neutral-600">
              Your recent DEX transactions will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
