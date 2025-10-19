"use client";

import { useWalletBalance } from "@/util/api/hooks/useWalletBalance";
import { Address } from "viem";
import { PortfolioPie } from "./portfolio-pie";
import { TokensPortfolioList } from "./tokens-grid";
import { NetWorthCard } from "./net-worth-card";

type Props = {
  address: Address;
};

export function PortfolioGrid({ address }: Props) {
  const { data, isLoading, error, isError } = useWalletBalance(address);

  if (!data) return <div>Loading data...</div>;
  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="mt-2 grid h-[700px] grid-cols-2">
      <TokensPortfolioList tokens={data.result} />

      <div className="flex flex-col">
        <div className="flex-1">
          <NetWorthCard address={address} />
        </div>

        <div className="flex-1">
          <PortfolioPie tokens={data.result} />
        </div>
      </div>
    </div>
  );
}
