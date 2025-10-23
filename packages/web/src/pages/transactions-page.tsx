"use client";

import {
  TransactionTableNavigation,
  TransactionsTable,
} from "@/components/transaction-table";

import { useWalletHistory } from "@/util/api/hooks/useWalletHistory";
import { useState } from "react";
import { useAccount } from "wagmi";

export function TransactionsPage() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) return <h1>not defined...</h1>;

  const [cursor, setCursor] = useState<string | undefined>();
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);

  const { data, isLoading, isError } = useWalletHistory({
    address,
    chainId,
    cursor,
  });

  if (isLoading || !data) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    return <div>There was an error loading transactions</div>;
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
    <div className="flex w-full flex-col">
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
