"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "../ui/button";

type Props = {
  onBackPressed: () => void;
  onBackDisabled: boolean;
  onForwardPressed: () => void;
  onForwardDisabled: boolean;
  page: number;
};

export function TransactionTableNavigation({
  onBackDisabled,
  onBackPressed,
  onForwardDisabled,
  onForwardPressed,
  page,
}: Props) {
  return (
    <div className="mx-auto mt-2 flex items-center gap-4">
      <Button variant="ghost" onClick={onBackPressed} disabled={onBackDisabled}>
        <IoIosArrowBack />
      </Button>
      <span className="text-lg text-gray-400">{page}</span>
      <Button
        variant="ghost"
        onClick={onForwardPressed}
        disabled={onForwardDisabled}
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
}
