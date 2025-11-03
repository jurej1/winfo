"use client";

import { useLimitOrderByWallet } from "@/util/hooks/limit-order/useLimitOrderbyWallet";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/shorten-address";
import { DexLimitOrderTableRow } from "./dex-limit-order-table-row";
import { Spinner } from "../ui/spinner";

export function DexWalletLimitOrders() {
  const { isLoading, data } = useLimitOrderByWallet();

  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Your Limit Orders</p>
        {isLoading && <Spinner />}
      </div>

      <Table>
        <TableCaption>
          Limit Orders for {shortenAddress(address ?? "")}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tx Hash</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Selling</TableHead>
            <TableHead>Buying</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((order) => (
            <DexLimitOrderTableRow key={order.orderHash} limitOrder={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
