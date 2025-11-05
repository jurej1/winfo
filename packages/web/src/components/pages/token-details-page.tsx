"use client";

import TokenDetailsCard from "@/components/token-details/token-details-card";
import { TokenChartCard } from "@/components/token-details/token-chart-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return (
    <div className="mx-auto mt-2 grid max-w-7xl grid-cols-[1fr_400px] gap-2">
      <div
        className="overflow-y-hide flex flex-col gap-4 pr-2"
        style={{ minHeight: 0 }}
      >
        <TokenDetailsCard id={id} />
        <TokenChartCard id={id} />
      </div>
      <div className="sticky top-14 self-start">
        <DexSwapComponent />
      </div>
    </div>
  );
}
