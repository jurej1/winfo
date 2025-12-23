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
      <TableRow className="border-border">
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
        <span className="bg-success-50 text-success-700 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
          <FaCheck className="h-3 w-3" />
          Success
        </span>
      );
    } else {
      return (
        <span className="bg-error-50 text-error-700 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
          <ImCross className="h-3 w-3" />
          Failed
        </span>
      );
    }
  };

  return (
    <TableRow className="group/row border-border transition-all duration-150 hover:bg-accent-purple-50/50 dark:hover:bg-accent-purple-950/20">
      <TableCell className="py-4">
        <div className="flex items-center gap-2">
          <code className="text-primary-dark-900 rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-sm font-medium">
            {shortenAddress(tx.transactionHash)}
          </code>
          {txUrl && (
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-purple-600 text-neutral-500 transition-colors"
            >
              <FaExternalLinkAlt className="h-3 w-3" />
            </a>
          )}
        </div>
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
          Chain {chainId}
        </span>
      </TableCell>
      <TableCell>
        <StatusBadge />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <code className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-600">
            {shortenAddress(from)}
          </code>
          <HiArrowRight className="h-4 w-4 text-neutral-400" />
          <code className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-600">
            {shortenAddress(to || "")}
          </code>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-primary-dark-900 text-sm font-medium">
            {totalFeeEth.toFixed(6)} {chain?.nativeCurrency.symbol}
          </span>
          <span className="text-xs text-neutral-600">Gas Fee</span>
        </div>
      </TableCell>
    </TableRow>
  );
}
