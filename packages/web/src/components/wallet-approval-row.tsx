"use client";

import { ERC_20ABI } from "@/lib/web3/erc20ABI";
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
    if (isReceiptSuccess) {
      toast.success(receipt.transactionHash);
      onRevokeSuccess(approval.transaction_hash);
    }
  }, [isReceiptSuccess, receipt]);

  const onRevokePressed = (tokenAdress: Address, spenderAddress: Address) => {
    writeContract({
      abi: ERC_20ABI,
      address: tokenAdress,
      functionName: "approve",
      args: [spenderAddress, BigInt(0)],
    });
  };

  return (
    <TableRow>
      <TableCell className="text-xs text-gray-400">
        {shortenAddress(approval.transaction_hash)}
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <span>{approval.value_formatted}</span>
          <span className="uppercase">{approval.token.symbol}</span>
          {token.logo != null && (
            <Image
              src={token.logo}
              alt="Token Logo"
              height={17}
              width={17}
              className="object-contain"
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        {new Date(approval.block_timestamp).toLocaleDateString()}
      </TableCell>
      <TableCell>{formatCurrency(Number(token.usd_at_risk), "$")}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 text-xs text-gray-400">
          <span>{shortenAddress(approval.spender.address)}</span>
          {showSpenderInfo && (
            <div className="flex gap-1">
              <span>{spender.entity}</span>
              {spender.entity_logo && (
                <Image
                  src={spender.entity_logo}
                  alt={spender.entity ?? "Spender Logo"}
                  height={15}
                  width={15}
                  className="object-contain"
                />
              )}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          onClick={() => onRevokePressed(token.address, spender.address)}
        >
          {showLoading ? <Spinner /> : "Revoke"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
