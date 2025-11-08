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
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <MdHistory className="text-slate_gray-DEFAULT h-5 w-5" />
            <h3 className="text-slate_gray-DEFAULT text-lg font-semibold tracking-wider uppercase">
              Recent DEX Transactions
            </h3>
          </div>
          <p className="text-outer_space-DEFAULT text-sm">
            Latest swaps performed on the decentralized exchange
            {data && ` (${data.length} transaction${data.length !== 1 ? 's' : ''})`}
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm">
          {data && data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-platinum-300 hover:bg-transparent">
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Transaction
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Chain
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Status
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Route
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
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
              <MdHistory className="text-platinum-500 mb-4 h-12 w-12" />
              <p className="text-slate_gray-DEFAULT text-lg font-semibold">
                No transactions yet
              </p>
              <p className="text-outer_space-DEFAULT text-sm">
                Your recent DEX transactions will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
