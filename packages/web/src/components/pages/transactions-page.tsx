"use client";

import {
  TransactionTableNavigation,
  TransactionsTable,
} from "@/components/transaction-table";
import { useWalletHistory } from "@/util/hooks/wallet/useWalletHistory";
import { LoadingCard } from "@/components/ui/loading-card";

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
      <div className="mx-auto mt-5 max-w-7xl">
        <LoadingCard message="Loading Transaction History..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-5 max-w-7xl">
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <p className="text-primary-dark-900 mb-2 text-base font-semibold">
              Error Loading Transactions
            </p>
            <p className="text-sm text-neutral-600">
              There was an error loading your transaction history. Please try
              again.
            </p>
          </div>
        </div>
      </div>
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
    <div className="mx-auto mt-5 flex max-w-7xl flex-col">
      <TransactionsTable transactions={data.result} />
      <TransactionTableNavigation
        onBackPressed={onBackwardsPressed}
        onBackDisabled={data.page == 0}
        onForwardPressed={onForwardPressed}
        onForwardDisabled={data.cursor == null}
        page={data.page + 1}
      />
    </div>
  );
}
