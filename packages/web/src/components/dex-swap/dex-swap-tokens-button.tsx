"use client";

import { Button } from "../ui/button";
import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { IoIosArrowDown } from "react-icons/io";

export function DexSwapTokensButton() {
  const swapTokens = useSwapStore((state) => state.swapTokens);
  return (
    <Button className="cursor-pointer" onClick={swapTokens}>
      <IoIosArrowDown />
    </Button>
  );
}
