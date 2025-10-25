"use client";

import TokenDetails from "@/components/token-details";
import { TokenChartCard } from "@/components/token-details/token-chart-card";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return (
    <div className="m-auto my-2 flex max-w-7xl flex-col">
      <TokenChartCard id={id} />
      <TokenDetails className="mt-10" id={id} />
    </div>
  );
}
