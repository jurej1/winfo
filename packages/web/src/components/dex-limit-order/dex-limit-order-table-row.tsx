"use client";

import { LimitOrderApiItem } from "@1inch/limit-order-sdk";
import { TableCell, TableRow } from "../ui/table";
import { shortenAddress } from "@/lib/shorten-address";
import { useAccount, useReadContract, useToken, useWriteContract } from "wagmi";
import { Address, erc20Abi } from "viem";
import { Button } from "../ui/button";
import { useLimitOrderCancel } from "@/util/hooks/limit-order/useLimitOrderCancel";
import { Spinner } from "../ui/spinner";

type Props = {
  limitOrder: LimitOrderApiItem;
};

export function DexLimitOrderTableRow({ limitOrder }: Props) {
  const { orderHash, createDateTime, makerRate, data } = limitOrder;

  const { makerAsset, takerAsset } = data;

  const { cancelOrder, isPending: isCancelPending } = useLimitOrderCancel({
    limitOrder,
  });

  const { address, chainId } = useAccount();

  const { data: sellingToken } = useReadContract({
    abi: erc20Abi,
    account: address,
    address: makerAsset as Address,
    functionName: "symbol",
    chainId,
  });

  const { data: buyingToken } = useReadContract({
    abi: erc20Abi,
    account: address,
    address: takerAsset as Address,
    functionName: "symbol",
    chainId,
  });

  return (
    <TableRow>
      <TableCell className="font-mono">{shortenAddress(orderHash)}</TableCell>
      <TableCell>
        {createDateTime
          ? new Date(createDateTime).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "-"}
      </TableCell>
      <TableCell>{makerRate}</TableCell>
      <TableCell>{sellingToken}</TableCell>
      <TableCell>{buyingToken}</TableCell>
      <TableCell>
        <Button onClick={cancelOrder} className="w-25">
          {isCancelPending ? <Spinner /> : "Cancel"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
