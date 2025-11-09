"use client";

import TokenDetailsCard from "@/components/token-details/token-details-card";
import { TokenChartCard } from "@/components/token-details/token-chart-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:grid lg:grid-cols-[1fr_400px]">
      <div className="flex flex-col gap-6">
        <TokenDetailsCard id={id} />
        <TokenChartCard id={id} />
      </div>
      <div className="sticky top-6 self-baseline">
        <DexSwapComponent />
      </div>
    </div>
  );
}
