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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { shortenAddress } from "@/lib/shorten-address";
import { getTransactionTimeAgo } from "@/lib/get-transaction-time-ago";
import { MdHistory } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass-elevated">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple-500/20 to-accent-blue-500/20">
              <MdHistory className="h-5 w-5 text-accent-purple-500" />
            </div>
            <div>
              <CardTitle className="text-base">Transaction History</CardTitle>
              <CardDescription>
                Recent transactions for {shortenAddress(address || "")}
                {transactions.length > 0 &&
                  ` (${transactions.length} transaction${transactions.length !== 1 ? "s" : ""})`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table Container */}
          <div className="glass-subtle overflow-hidden rounded-lg">
            {transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-medium text-muted-foreground">
                      From
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      To
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Category
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Gas
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Value
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Summary
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {transactions.map((tx) => {
                    return (
                      <TableRow
                        key={tx.hash}
                        className="group/row border-border transition-all duration-150 hover:bg-accent-purple-50/50 dark:hover:bg-accent-purple-950/20"
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
                          <p className="max-w-xs truncate text-xs text-muted-foreground">
                            {tx.summary}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-medium text-muted-foreground">
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
                <MdHistory className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-base font-medium">
                  No transactions yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Your transaction history will appear here
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
