"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { DexNetworkCost } from "./dex-network-cost";

export function DexSwapCollapsibleInfo() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full justify-between bg-yellow-50 py-2">
          <span>Info</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <DexNetworkCost />
      </CollapsibleContent>
    </Collapsible>
  );
}
