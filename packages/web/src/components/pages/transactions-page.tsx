"use client";

import {
  TransactionTableNavigation,
  TransactionsTable,
} from "@/components/transaction-table";
import { useWalletHistory } from "@/util/hooks/wallet/useWalletHistory";
import { LoadingCard } from "@/components/ui/loading-card";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "../landing/animated-background";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

import { useEffect, useState } from "react";
import { Address } from "viem";

type Props = {
  chainId: number;
  address: Address;
};

export default function TransactionsPage({ address, chainId }: Props) {
  const [cursor, setCursor] = useState<string | undefined>();
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);

  const { data, isLoading, isError } = useWalletHistory({
    address,
    chainId,
    cursor,
  });

  useEffect(() => {
    setCursor(undefined);
    setCursorHistory([]);
  }, [chainId, setCursor, setCursorHistory]);

  if (isLoading || !data) {
    return (
      <>
        <AnimatedBackground />
        <div className="mx-auto mt-5 max-w-7xl p-6">
          <LoadingCard message="Loading Transaction History..." />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <AnimatedBackground />
        <div className="mx-auto mt-5 max-w-7xl p-6">
          <Card variant="glass-subtle" className="min-h-[300px]">
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center">
                <p className="mb-2 text-base font-semibold">
                  Error Loading Transactions
                </p>
                <p className="text-sm text-muted-foreground">
                  There was an error loading your transaction history. Please try
                  again.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const onForwardPressed = () => {
    if (data.cursor) {
      if (cursor) {
        setCursorHistory((prev) => [...prev, cursor]);
      } else {
        setCursorHistory((prev) => [...prev, "first-page"]);
      }

      setCursor(data.cursor);
    }
  };

  const onBackwardsPressed = () => {
    if (cursorHistory.length > 0) {
      const previousCursor = cursorHistory[cursorHistory.length - 1];

      setCursorHistory((prev) => prev.slice(0, -1));

      setCursor(previousCursor === "first-page" ? undefined : previousCursor);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-5 flex max-w-7xl flex-col p-6"
      >
        <motion.div variants={fadeInUp}>
          <TransactionsTable transactions={data.result} />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <TransactionTableNavigation
            onBackPressed={onBackwardsPressed}
            onBackDisabled={data.page == 0}
            onForwardPressed={onForwardPressed}
            onForwardDisabled={data.cursor == null}
            page={data.page + 1}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
