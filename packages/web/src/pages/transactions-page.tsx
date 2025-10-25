"use client";

import {
  TransactionTableNavigation,
  TransactionsTable,
} from "@/components/transaction-table";
import { useWalletHistory } from "@/util/hooks/useWalletHistory";

import { useEffect, useState } from "react";
import { Address } from "viem";

type Props = {
  chainId: number;
  address: Address;
};

export function TransactionsPage({ address, chainId }: Props) {
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
