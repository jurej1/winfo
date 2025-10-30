"use client";

import { useState } from "react";
import { DexCardBackground } from "../dex/dex-card-bacground";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { Input } from "../ui/input";

type Props = {
  sellToken?: TokenDBwithPrice;
  buyToken?: TokenDBwithPrice;
};

export function DexWhenWorthInput({ sellToken, buyToken }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <DexCardBackground isHovering={setIsHover}>
      <p className="text-xs">When 1 {sellToken?.symbol} is worth </p>
      <Input readOnly />
    </DexCardBackground>
  );
}
