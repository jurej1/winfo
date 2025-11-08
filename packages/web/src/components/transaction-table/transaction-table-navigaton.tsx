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
    <div className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBackPressed}
        disabled={onBackDisabled}
        className="h-8 w-8 transition-colors duration-150 hover:bg-neutral-100 disabled:opacity-40"
      >
        <IoIosArrowBack className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 px-2">
        <span className="text-xs font-medium text-neutral-600">
          Page
        </span>
        <span className="text-base font-semibold text-primary-dark-900">{page}</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onForwardPressed}
        disabled={onForwardDisabled}
        className="h-8 w-8 transition-colors duration-150 hover:bg-neutral-100 disabled:opacity-40"
      >
        <IoIosArrowForward className="h-5 w-5" />
      </Button>
    </div>
  );
}
