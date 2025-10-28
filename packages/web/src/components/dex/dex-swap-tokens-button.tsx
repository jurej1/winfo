import { IoSwapVerticalSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { useSwapStore } from "@/util/hooks/swap/useSwapStore";

export function DexSwapTokensButton() {
  const swapTokens = useSwapStore((state) => state.swapTokens);
  return (
    <Button className="cursor-pointer" onClick={swapTokens}>
      <IoSwapVerticalSharp />
    </Button>
  );
}
