"use client";

import { useAccount } from "wagmi";
import { WalletHistoryItem } from "../../../../types/src/moralis/wallet.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { shortenAddress } from "@/lib/shorten-address";
import { getTransactionTimeAgo } from "@/lib/get-transaction-time-ago";

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
    <Table>
      <TableCaption>List of your recent transaction for {address}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Gas</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((tx) => {
          return (
            <TableRow key={tx.hash}>
              <TableCell>
                <TransactionAddress address={shortenAddress(tx.from_address)} />
              </TableCell>
              <TableCell>
                <TransactionAddress address={shortenAddress(tx.from_address)} />
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
              <TableCell className="text-xs text-gray-400">
                {tx.summary}
              </TableCell>
              <TableCell>{getTransactionTimeAgo(tx.block_timestamp)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
