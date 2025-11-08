"use client";

import { ApprovalResult } from "@w-info-sst/types";
import { Address } from "viem/accounts";
import { useTransactionReceipt, useWriteContract } from "wagmi";
import { TableCell, TableRow } from "./ui/table";
import { shortenAddress } from "@/lib/shorten-address";
import Image from "next/image";
import { formatCurrency } from "@coingecko/cryptoformat";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";
import { erc20Abi } from "viem";
import { MdCheckCircle } from "react-icons/md";

type Props = {
  approval: ApprovalResult;
  onRevokeSuccess: (hash: string) => void;
};
export function WalletApprovalRow({ approval, onRevokeSuccess }: Props) {
  const { spender, token } = approval;

  const showSpenderInfo = spender.address_label && spender.entity;

  const {
    writeContract,
    isPending: showLoading,
    data: hash,
  } = useWriteContract();

  const { isSuccess: isReceiptSuccess, data: receipt } = useTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isReceiptSuccess && receipt) {
      toast.success("Approval revoked successfully!", {
        description: shortenAddress(receipt.transactionHash),
      });
      onRevokeSuccess(approval.transaction_hash);
    }
  }, [isReceiptSuccess, receipt, approval.transaction_hash, onRevokeSuccess]);

  const onRevokePressed = (tokenAddress: Address, spenderAddress: Address) => {
    writeContract({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [spenderAddress, BigInt(0)],
    });
  };

  // Format the date
  const formattedDate = new Date(approval.block_timestamp).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const formattedTime = new Date(approval.block_timestamp).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <TableRow className="border-platinum-200 group/row transition-all duration-200 hover:bg-white/40">
      <TableCell className="py-4">
        <code className="text-onyx-DEFAULT rounded-lg bg-white/80 px-2 py-1 font-mono text-xs font-medium">
          {shortenAddress(approval.transaction_hash)}
        </code>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-3">
          {token.logo != null && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 p-1 shadow-sm transition-transform duration-200 group-hover/row:scale-110">
              <Image
                src={token.logo}
                alt="Token Logo"
                height={24}
                width={24}
                className="object-contain"
                draggable="false"
              />
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-onyx-DEFAULT text-sm font-semibold">
                {approval.value_formatted}
              </span>
              <span className="text-slate_gray-DEFAULT text-xs font-medium uppercase">
                {approval.token.symbol}
              </span>
            </div>
            <span className="text-slate_gray-DEFAULT text-xs">
              {token.name}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="text-onyx-DEFAULT text-sm font-semibold">
            {formattedDate}
          </span>
          <span className="text-slate_gray-DEFAULT text-xs">
            {formattedTime}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-onyx-DEFAULT text-sm font-semibold">
            {formatCurrency(Number(token.usd_at_risk), "$")}
          </span>
          <span className="text-slate_gray-DEFAULT text-xs">At Risk</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-2">
          <code className="text-slate_gray-DEFAULT bg-platinum-200 w-fit rounded px-2 py-1 font-mono text-xs">
            {shortenAddress(approval.spender.address)}
          </code>
          {showSpenderInfo && (
            <div className="flex items-center gap-2">
              {spender.entity_logo && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 shadow-sm">
                  <Image
                    src={spender.entity_logo}
                    alt={spender.entity ?? "Spender Logo"}
                    height={16}
                    width={16}
                    className="object-contain"
                    draggable="false"
                  />
                </div>
              )}
              <span className="text-onyx-DEFAULT flex items-center gap-1 text-xs font-medium">
                {spender.entity}
                {spender.address_label && (
                  <MdCheckCircle className="h-3 w-3 text-green-600" />
                )}
              </span>
            </div>
          )}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <Button
          size="sm"
          onClick={() => onRevokePressed(token.address, spender.address)}
          disabled={showLoading}
          className="bg-red-100 text-red-700 transition-all duration-200 hover:scale-105 hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          {showLoading ? <Spinner /> : "Revoke"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
