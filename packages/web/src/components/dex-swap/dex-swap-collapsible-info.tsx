"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";

export function DexSwapCollapsibleInfo() {
  const [open] = useState(true);

  return (
    <Collapsible open={open} className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full justify-between py-2">
          <span>Info</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2"></CollapsibleContent>
    </Collapsible>
  );
}
