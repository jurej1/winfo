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
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <MdHistory className="h-5 w-5 text-neutral-500" />
          <h3 className="text-primary-dark-900 text-base font-semibold">
            Transaction History
          </h3>
        </div>
        <p className="text-sm text-neutral-600">
          Recent transactions for {shortenAddress(address || "")}
          {transactions.length > 0 &&
            ` (${transactions.length} transaction${transactions.length !== 1 ? "s" : ""})`}
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-neutral-200">
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-200 bg-neutral-50 hover:bg-neutral-50">
                <TableHead className="font-medium text-neutral-600">
                  From
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  To
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Category
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Gas
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Value
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Summary
                </TableHead>
                <TableHead className="font-medium text-neutral-600">
                  Time
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((tx) => {
                return (
                  <TableRow
                    key={tx.hash}
                    className="group/row border-neutral-200 transition-all duration-150 hover:bg-neutral-50"
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
                      <p className="max-w-xs truncate text-xs text-neutral-600">
                        {tx.summary}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-neutral-600">
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
            <MdHistory className="mb-4 h-12 w-12 text-neutral-300" />
            <p className="text-base font-medium text-neutral-900">
              No transactions yet
            </p>
            <p className="text-sm text-neutral-600">
              Your transaction history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
