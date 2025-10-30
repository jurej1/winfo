"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  isHovering: (val: boolean) => void;
};

export function DexCardBackground({ children, isHovering }: Props) {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => isHovering(isHover), [isHover, setIsHover]);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "flex flex-col gap-2 rounded-2xl bg-blue-200/20 p-4",
        "transition-colors duration-200 hover:bg-blue-200/40",
      )}
    >
      {children}
    </div>
  );
}
