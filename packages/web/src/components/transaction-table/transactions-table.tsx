"use client";

import { useAccount } from "wagmi";
import { WalletHistoryItem } from "../../../../types/src/moralis/wallet.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { shortenAddress } from "@/lib/shorten-address";
import { getTransactionTimeAgo } from "@/lib/get-transaction-time-ago";
import { MdHistory } from "react-icons/md";

import {
  TranassctionValue,
  TransactionAddress,
  TransactionCategory,
  TransactionGasProgress,
} from ".";

type Props = {
  transactions: WalletHistoryItem[];
};
export function TransactionsTable({ transactions }: Props) {
  const { address } = useAccount();

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
              Transaction History
            </h3>
          </div>
          <p className="text-outer_space-DEFAULT text-sm">
            Recent transactions for {shortenAddress(address || "")}
            {transactions.length > 0 &&
              ` (${transactions.length} transaction${transactions.length !== 1 ? "s" : ""})`}
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm">
          {transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-platinum-300 hover:bg-transparent">
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    From
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    To
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Category
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Gas
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Value
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Summary
                  </TableHead>
                  <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((tx) => {
                  return (
                    <TableRow
                      key={tx.hash}
                      className="border-platinum-200 group/row transition-all duration-200 hover:bg-white/40"
                    >
                      <TableCell className="py-4">
                        <TransactionAddress
                          address={shortenAddress(tx.from_address)}
                        />
                      </TableCell>
                      <TableCell>
                        <TransactionAddress
                          address={shortenAddress(tx.to_address)}
                        />
                      </TableCell>
                      <TableCell>
                        <TransactionCategory category={tx.category} />
                      </TableCell>
                      <TableCell>
                        <TransactionGasProgress
                          gas={tx.gas}
                          gasUsed={tx.receipt_gas_used}
                        />
                      </TableCell>
                      <TableCell>
                        <TranassctionValue tx={tx} />
                      </TableCell>
                      <TableCell>
                        <p className="text-slate_gray-DEFAULT max-w-xs truncate text-xs">
                          {tx.summary}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-onyx-DEFAULT text-xs font-medium">
                          {getTransactionTimeAgo(tx.block_timestamp)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <MdHistory className="text-platinum-500 mb-4 h-12 w-12" />
              <p className="text-slate_gray-DEFAULT text-lg font-semibold">
                No transactions yet
              </p>
              <p className="text-outer_space-DEFAULT text-sm">
                Your transaction history will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
