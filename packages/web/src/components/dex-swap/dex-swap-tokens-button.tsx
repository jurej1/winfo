"use client";

import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  onClick: () => void;
};

export function DexSwapTokensButton({ onClick }: Props) {
  return (
    <Button className="cursor-pointer" onClick={onClick}>
      <IoIosArrowDown />
    </Button>
  );
}
