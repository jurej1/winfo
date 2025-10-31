"use client";

import { useState } from "react";
import { DexCardBackground } from "../dex/dex-card-bacground";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
  sellToken?: TokenDBwithPrice;
  buyToken?: TokenDBwithPrice;
  ratio: string;
  setRatio: (val: string) => void;
};

export function DexWhenWorthInput({
  sellToken,
  buyToken,
  ratio,
  setRatio,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <DexCardBackground isHovering={setIsHover}>
      <p className="text-xs">When 1 {sellToken?.symbol} is worth </p>

      <div className="flex items-center justify-between gap-4">
        <Input
          className={cn(
            "border-none text-black shadow-none focus-visible:border-none focus-visible:ring-0",
            "transition-colors duration-300 ease-in-out",
            "",
          )}
          placeholder="0.0"
          value={ratio}
          style={{
            fontSize: 28,
          }}
          onChange={(event) => {
            let val = event.target.value;
            val = val.replace(/[^0-9.,]/g, "");
            setRatio(val);
          }}
          inputMode="decimal"
          pattern="[0-9.,]*"
        />

        {buyToken && (
          <Button asChild>
            <div className="flex gap-2">
              <Image
                src={buyToken.image ?? ""}
                height={20}
                width={20}
                alt={buyToken.symbol}
                draggable={false}
                referrerPolicy="no-referrer"
              />
              <p>{buyToken.symbol}</p>
            </div>
          </Button>
        )}
      </div>
    </DexCardBackground>
  );
}
