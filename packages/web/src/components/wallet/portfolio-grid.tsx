"use client";

import { useWalletBalance } from "@/util/api/hooks/useWalletBalance";
import { Address } from "viem";
import { PortfolioTokenCard } from "./portfolio-token-card";
import { PortfolioPie } from "./portfolio-pie";
import { TokensPortfolioList } from "./tokens-grid";

type Props = {
  address: Address;
};

export function PortfolioGrid({ address }: Props) {
  const { data, isLoading, error, isError } = useWalletBalance(address);

  if (!data) return <div>Loading data...</div>;

  return (
    <div className="grid h-[700px] grid-cols-2">
      <TokensPortfolioList tokens={[...data.result, ...data.result]} />

      <PortfolioPie tokens={data.result} />
    </div>
  );
}
