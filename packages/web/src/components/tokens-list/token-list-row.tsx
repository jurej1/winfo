"use client";

import { TokenListInfo } from "@w-info-sst/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatCurrency } from "@coingecko/cryptoformat";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type Props = {
  token: TokenListInfo;
};

export function TokenListRow({ token }: Props) {
  const router = useRouter();

  const {
    id,
    image,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    market_cap_rank,
    high_24h,
    low_24h,
    price_change_percentage_1h_in_currency,
    circulating_supply,
  } = token;

  const result = Math.sign(price_change_percentage_24h);

  const handleRowClick = useCallback(() => {
    router.push(`/token/${id}`);
  }, [router, id]);

  const formatLargeNumber = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TableRow onClick={handleRowClick}>
      {/* Token */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={image}
            alt="Token Image"
            height={18}
            width={18}
            className="object-contain"
          />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </TableCell>
      {/* Price */}
      <TableCell>{formatCurrency(current_price, "$")}</TableCell>
      {/* Change 24h */}
      <TableCell
        style={{
          color: result == 1 ? "green" : result == 0 ? "" : "red",
        }}
      >
        {Math.abs(price_change_percentage_24h).toFixed(2)}%
      </TableCell>
      {/* Change 1h */}
      <TableCell
        style={{
          color: result == 1 ? "green" : result == 0 ? "" : "red",
        }}
      >
        {Math.abs(price_change_percentage_1h_in_currency).toFixed(2)}%
      </TableCell>
      {/* Market Cap */}
      <TableCell>
        ${formatLargeNumber(market_cap)}
        <span className="ml-1 text-xs text-gray-400">({market_cap_rank})</span>
      </TableCell>
      {/* Total Volume */}
      <TableCell>${formatLargeNumber(total_volume)}</TableCell>
      {/* High 24h */}
      <TableCell>{formatCurrency(high_24h, "$")}</TableCell>
      {/* Low 24h */}
      <TableCell>{formatCurrency(low_24h, "$")}</TableCell>
      {/* Circulating Supply */}
      <TableCell>{formatLargeNumber(circulating_supply)}</TableCell>
    </TableRow>
  );
}
