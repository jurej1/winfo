"use client";

import { DexTransactionDB } from "@w-info-sst/db";
import { TableCell, TableRow } from "../ui/table";
import { useAccount, useTransactionReceipt } from "wagmi";
import { Address, formatEther } from "viem";
import { shortenAddress } from "@/lib/shorten-address";
import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiArrowRight } from "react-icons/hi";
import { Skeleton } from "../ui/skeleton";

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

  if (isLoading || !data) {
    return (
      <TableRow className="border-platinum-200">
        <TableCell colSpan={5}>
          <Skeleton className="h-12 w-full" />
        </TableCell>
      </TableRow>
    );
  }

  const { status, from, to, gasUsed, effectiveGasPrice } = data;

  let totalFeeEth = 0;
  if (gasUsed && effectiveGasPrice) {
    const totalFeeWei = gasUsed * effectiveGasPrice;
    totalFeeEth = parseFloat(formatEther(totalFeeWei));
  }

  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  const txUrl = blockExplorerUrl
    ? `${blockExplorerUrl}/tx/${transactionHash}`
    : null;

  const StatusBadge = () => {
    if (status === "success") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <FaCheck className="h-3 w-3" />
          Success
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <ImCross className="h-3 w-3" />
          Failed
        </span>
      );
    }
  };

  return (
    <TableRow className="border-platinum-200 group/row transition-all duration-200 hover:bg-white/40">
      <TableCell className="py-4">
        <div className="flex items-center gap-2">
          <code className="text-onyx-DEFAULT rounded-lg bg-white/80 px-2 py-1 font-mono text-sm font-medium">
            {shortenAddress(tx.transactionHash)}
          </code>
          {txUrl && (
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate_gray-DEFAULT hover:text-onyx-DEFAULT transition-colors"
            >
              <FaExternalLinkAlt className="h-3 w-3" />
            </a>
          )}
        </div>
      </TableCell>
      <TableCell>
        <span className="bg-slate_gray-DEFAULT/10 text-slate_gray-DEFAULT inline-flex items-center rounded-full px-3 py-1 text-xs font-bold">
          Chain {chainId}
        </span>
      </TableCell>
      <TableCell>
        <StatusBadge />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <code className="text-slate_gray-DEFAULT bg-platinum-200 rounded px-2 py-1 font-mono text-xs">
            {shortenAddress(from)}
          </code>
          <HiArrowRight className="text-slate_gray-DEFAULT h-4 w-4" />
          <code className="text-slate_gray-DEFAULT bg-platinum-200 rounded px-2 py-1 font-mono text-xs">
            {shortenAddress(to || "")}
          </code>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-onyx-DEFAULT text-sm font-semibold">
            {totalFeeEth.toFixed(6)} {chain?.nativeCurrency.symbol}
          </span>
          <span className="text-slate_gray-DEFAULT text-xs">Gas Fee</span>
        </div>
      </TableCell>
    </TableRow>
  );
}
