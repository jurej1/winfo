"use client";

import TokenDetailsCard from "@/components/token-details/token-details-card";
import { TokenChartCard } from "@/components/token-details/token-chart-card";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return (
    <div className="m-auto my-2 flex max-w-7xl flex-col gap-4">
      <TokenChartCard id={id} />
      <TokenDetailsCard id={id} />
    </div>
  );
}
