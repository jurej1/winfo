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

  return (
    <TableRow>
      <TableCell className="font-mono">{shortenAddress(orderHash)}</TableCell>
      <TableCell>
        <div className="flex flex-col text-xs">
          <span>
            Created:
            <span className="text-gray-400"> {createDateFormatted()}</span>
          </span>
          <span>
            Expires on:
            <span className="text-gray-400"> {orderExpirationDate()}</span>
          </span>
          {timeDifferenceFormatted && (
            <span>
              In:
              <span className="text-gray-400"> {timeDifferenceFormatted}</span>
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col text-xs">
          <TraitRow
            label="Partial fill allowed"
            value={limitOrderMakerTraits?.isPartialFillAllowed}
          />
          <TraitRow
            label="Multiple fills allowed"
            value={limitOrderMakerTraits?.isMultipleFillsAllowed}
          />
          <TraitRow
            label="Has extension"
            value={limitOrderMakerTraits?.hasExtension}
          />
          <TraitRow
            label="Uses Permit2"
            value={limitOrderMakerTraits?.usePermit2}
          />
        </div>
      </TableCell>
      <TableCell>
        {sellingToken && (
          <TokenWithImage
            src={sellingToken?.logo ?? ""}
            symbol={sellingToken?.symbol ?? "xx"}
          />
        )}
        <div className="flex flex-col">
          <span>{sellingAmountFormatted}</span>
          <span className="text-xs text-gray-400">{sellingAmountUsd}</span>
        </div>
      </TableCell>
      <TableCell>
        {buyingToken && (
          <TokenWithImage
            src={buyingToken?.logo ?? ""}
            symbol={buyingToken?.symbol ?? "xx"}
          />
        )}
        <div className="flex flex-col">
          <span>{buyingAmountFormatted}</span>
          <span className="text-xs text-gray-400">{buyingAmountUsd}</span>
        </div>
      </TableCell>
      <TableCell>
        <Button onClick={cancelOrder} className="w-25">
          {isCancelPending ? <Spinner /> : "Cancel"}
        </Button>
      </TableCell>
    </TableRow>
  );
}

const TokenWithImage = ({ src, symbol }: { src: string; symbol: string }) => {
  return (
    <div className="flex gap-1">
      <Image
        src={src}
        alt={symbol}
        height={15}
        width={15}
        className="object-contain"
      />
      <span className="font-semibold text-gray-400">{symbol}</span>
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
  <div className="flex items-center">
    <span>{label}:</span>
    <span className="font-mono">
      {value ? (
        <IoShieldCheckmark className="ml-1 text-blue-400" size={14} />
      ) : (
        <IoIosClose className="ml-1 text-red-300" size={20} />
      )}
    </span>
  </div>
);
