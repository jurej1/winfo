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
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative mx-auto mt-4 flex w-fit items-center gap-3 overflow-hidden rounded-2xl border bg-gradient-to-br px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Decorative background */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br blur-2xl" />

      <div className="relative z-10 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackPressed}
          disabled={onBackDisabled}
          className="hover:bg-slate_gray-DEFAULT h-9 w-9 rounded-lg transition-all duration-200 hover:scale-105 hover:text-white disabled:opacity-40 disabled:hover:scale-100"
        >
          <IoIosArrowBack className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 rounded-lg bg-white/60 px-4 py-2 backdrop-blur-sm">
          <span className="text-slate_gray-DEFAULT text-xs font-medium tracking-wider uppercase">
            Page
          </span>
          <span className="text-onyx-DEFAULT text-lg font-bold">{page}</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onForwardPressed}
          disabled={onForwardDisabled}
          className="hover:bg-slate_gray-DEFAULT h-9 w-9 rounded-lg transition-all duration-200 hover:scale-105 hover:text-white disabled:opacity-40 disabled:hover:scale-100"
        >
          <IoIosArrowForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
