"use client";

import { DexTransactionDB } from "@w-info-sst/db";
import { TableCell, TableRow } from "../ui/table";
import { useAccount, useTransactionReceipt } from "wagmi";
import { Address, formatEther } from "viem";
import { shortenAddress } from "@/lib/shorten-address";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type Props = {
  tx: DexTransactionDB;
};

export function DexRecentTransactionRow({ tx }: Props) {
  const { chain } = useAccount();

  const { transactionHash, chainId } = tx;

  const { isLoading, data } = useTransactionReceipt({
    hash: transactionHash as Address,
    chainId: chainId,
    query: {
      enabled: !!chainId && !!transactionHash,
    },
  });

  if (isLoading || !data) return <></>;

  const { status, from, to, gasUsed, effectiveGasPrice } = data;

  let totalFeeEth = 0;
  if (gasUsed && effectiveGasPrice) {
    const totalFeeWei = gasUsed * effectiveGasPrice;

    totalFeeEth = parseFloat(formatEther(totalFeeWei));
  }

  const StatusIcon = () => {
    if (status === "success") {
      return <FaCheck className="text-blue-500" />;
    } else {
      return <ImCross className="text-red-500" />;
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono">
        {shortenAddress(tx.transactionHash)}
      </TableCell>
      <TableCell>{chainId}</TableCell>
      <TableCell>
        <StatusIcon />
      </TableCell>
      <TableCell className="font-mono">{shortenAddress(from)}</TableCell>
      <TableCell className="font-mono">{shortenAddress(to || "")}</TableCell>
      <TableCell className="w-[180px]">
        <span className="text-xs font-medium text-gray-500">
          Fee: ${totalFeeEth.toFixed(6)} {chain?.nativeCurrency.symbol}
        </span>
      </TableCell>
    </TableRow>
  );
}
