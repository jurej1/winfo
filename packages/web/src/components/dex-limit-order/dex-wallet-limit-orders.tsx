"use client";

import { useLimitOrderByWallet } from "@/util/hooks/limit-order/useLimitOrderbyWallet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/shorten-address";
import { DexLimitOrderTableRow } from "./dex-limit-order-table-row";
import { Spinner } from "../ui/spinner";
import { LoadingCard } from "../ui/loading-card";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export function DexWalletLimitOrders() {
  const { isLoading, data, isError, error, isFetching } =
    useLimitOrderByWallet();

  const { address } = useAccount();

  if (isLoading) {
    return <LoadingCard message="Loading limit orders..." />;
  }

  if (isError) {
    return (
      <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <HiOutlineClipboardDocumentList className="text-error-600 h-5 w-5" />
            <h3 className="text-primary-dark-900 text-base font-semibold">
              Unable to load limit orders
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            {error instanceof Error ? error.message : "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const items = data?.items ?? [];
  const hasOrders = items.length > 0;
  const addressLabel = address ? shortenAddress(address) : "your wallet";

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <HiOutlineClipboardDocumentList className="h-5 w-5 text-neutral-500" />
            <h3 className="text-primary-dark-900 text-base font-semibold">
              Active Limit Orders
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            Monitoring limit orders for {addressLabel}
            {hasOrders && ` • ${items.length} active`}
          </p>
        </div>
        {isFetching && <Spinner className="h-5 w-5" />}
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200">
        {hasOrders ? (
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-200 bg-neutral-50 hover:bg-neutral-50">
                <TableHead className="w-[180px] text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Order
                </TableHead>
                <TableHead className="w-[200px] text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Timeline
                </TableHead>
                <TableHead className="text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Traits
                </TableHead>
                <TableHead className="w-[180px] text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Selling
                </TableHead>
                <TableHead className="w-[180px] text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Buying
                </TableHead>
                <TableHead className="w-[120px] text-right text-xs font-medium tracking-wide text-neutral-600 uppercase">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((order) => (
                <DexLimitOrderTableRow
                  key={order.orderHash}
                  limitOrder={order}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HiOutlineClipboardDocumentList className="mb-4 h-12 w-12 text-neutral-300" />
            <p className="text-base font-medium text-neutral-900">
              No active limit orders
            </p>
            <p className="mt-1 max-w-sm text-sm text-neutral-600">
              Create a limit order and it will appear here once submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
