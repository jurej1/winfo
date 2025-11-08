"use client";

import { LimitOrderApiItem } from "@1inch/limit-order-sdk";
import { TableCell, TableRow } from "../ui/table";
import { shortenAddress } from "@/lib/shorten-address";
import { Button } from "../ui/button";
import { useLimitOrderCancel } from "@/util/hooks/limit-order/useLimitOrderCancel";
import { Spinner } from "../ui/spinner";
import { useLimitOrderRow } from "@/util/hooks/limit-order/useLimitOrderRow";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useAccount } from "wagmi";

type Props = {
  limitOrder: LimitOrderApiItem;
};

export function DexLimitOrderTableRow({ limitOrder }: Props) {
  const { orderHash } = limitOrder;

  const {
    sellingToken,
    buyingToken,
    sellingAmountFormatted,
    buyingAmountFormatted,
    sellingAmountUsd,
    buyingAmountUsd,
    orderExpirationDate,
    createDateFormatted,
    timeDifferenceFormatted,
    limitOrderMakerTraits,
  } = useLimitOrderRow({ order: limitOrder });

  const { cancelOrder, isPending: isCancelPending } = useLimitOrderCancel({
    limitOrder,
  });

  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  const orderUrl = blockExplorerUrl
    ? `${blockExplorerUrl}/tx/${orderHash}`
    : undefined;

  return (
    <TableRow className="group/row border-neutral-200 transition-colors duration-150 hover:bg-neutral-50">
      <TableCell className="w-[180px] py-4">
        <div className="flex items-center gap-2">
          <code className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-sm text-primary-dark-900">
            {shortenAddress(orderHash)}
          </code>
          {orderUrl && (
            <Link
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-accent-teal-600"
            >
              <FaExternalLinkAlt className="h-3 w-3" />
            </Link>
          )}
        </div>
      </TableCell>
      <TableCell className="w-[200px] py-4">
        <div className="flex flex-col gap-1 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="font-medium text-neutral-700">Created:</span>
            {createDateFormatted()}
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-neutral-700">Expires:</span>
            {orderExpirationDate()}
          </span>
          {timeDifferenceFormatted && (
            <span className="flex items-center gap-1">
              <span className="font-medium text-neutral-700">Time left:</span>
              {timeDifferenceFormatted}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="grid grid-cols-1 gap-1">
          <TraitRow
            label="Partial fill"
            value={limitOrderMakerTraits?.isPartialFillAllowed}
          />
          <TraitRow
            label="Multiple fills"
            value={limitOrderMakerTraits?.isMultipleFillsAllowed}
          />
          <TraitRow
            label="Extension"
            value={limitOrderMakerTraits?.hasExtension}
          />
          <TraitRow
            label="Permit 2"
            value={limitOrderMakerTraits?.usePermit2}
          />
        </div>
      </TableCell>
      <TableCell className="w-[180px] py-4">
        <div className="flex items-center gap-3">
          {sellingToken && (
            <TokenWithImage
              src={sellingToken?.logo ?? ""}
              symbol={sellingToken?.symbol ?? "xx"}
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary-dark-900">
              {sellingAmountFormatted}
            </span>
            <span className="text-xs text-neutral-500">{sellingAmountUsd}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[180px] py-4">
        <div className="flex items-center gap-3">
          {buyingToken && (
            <TokenWithImage
              src={buyingToken?.logo ?? ""}
              symbol={buyingToken?.symbol ?? "xx"}
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary-dark-900">
              {buyingAmountFormatted}
            </span>
            <span className="text-xs text-neutral-500">{buyingAmountUsd}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[120px] py-4 text-right">
        <Button
          onClick={cancelOrder}
          variant="outline"
          className="inline-flex items-center justify-center gap-2"
        >
          {isCancelPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            "Cancel"
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}

const TokenWithImage = ({ src, symbol }: { src: string; symbol: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-50">
        {src ? (
          <Image
            src={src}
            alt={symbol}
            height={24}
            width={24}
            className="h-5 w-5 object-contain"
          />
        ) : (
          <span className="text-xs font-semibold text-neutral-500">
            {symbol.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold text-neutral-600">{symbol}</span>
    </div>
  );
};

const TraitRow = ({
  label,
  value,
}: {
  label: string;
  value: boolean | string | number | undefined;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs font-medium text-neutral-600">{label}</span>
    <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-[11px] font-semibold text-neutral-500">
      {value ? (
        <>
          <IoShieldCheckmark className="text-success-600" size={12} />
          <span>Enabled</span>
        </>
      ) : (
        <>
          <IoIosClose className="text-error-500" size={14} />
          <span>Disabled</span>
        </>
      )}
    </span>
  </div>
);
