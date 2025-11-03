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

export function DexWalletLimitOrders() {
  const { isLoading, data } = useLimitOrderByWallet();

  const { address } = useAccount();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Your Limit Orders</p>
      {isLoading && <p>Loading...</p>}
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
