"use client";

import { useCallback, useState } from "react";
import { DexCardBackground } from "../dex/dex-card-bacground";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { useLocalizedFormatter } from "@/util/formatter/useLocalizedFormatter";
import { NumberType } from "@/util/formatter/types";

type Props = {
  sellToken?: TokenDBwithPrice;
  buyToken?: TokenDBwithPrice;
  ratio: string;
};

export function DexWhenWorthInput({ sellToken, buyToken, ratio }: Props) {
  const [isHover, setIsHover] = useState(false);

  const { formatNumberOrString } = useLocalizedFormatter();

  const value = useCallback(
    () =>
      formatNumberOrString({
        value: ratio,
      }),
    [formatNumberOrString, ratio],
  );

  return (
    <DexCardBackground isHovering={setIsHover}>
      <p className="text-xs">When 1 {sellToken?.symbol} is worth </p>
      <Input
        // disabled={isLoadingTokens}
        // key={token?.address}
        // type={isNumberInput ? "number" : undefined}
        className={cn(
          "border-none text-black shadow-none focus-visible:border-none focus-visible:ring-0",
          "transition-colors duration-300 ease-in-out",
        )}
        placeholder="0.0"
        value={value()}
        style={{
          fontSize: 28,
        }}
        onChange={(event) => {}}
        readOnly={false}
      />
    </DexCardBackground>
  );
}
