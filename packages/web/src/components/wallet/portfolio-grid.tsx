"use client";

import { Address } from "viem";
import { PortfolioPie } from "./portfolio-pie";
import { TokensPortfolioList } from "./tokens-grid";
import { NetWorthCard } from "./net-worth-card";
import { Spinner } from "../ui/spinner";
import { useWalletBalance } from "@/util/hooks/wallet/useWalletBalance";

type Props = {
  address: Address;
  chainId: number;
};

export function PortfolioGrid({ address, chainId }: Props) {
  const { data, isLoading } = useWalletBalance(address, chainId);

  if (isLoading || !data) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2">
        <NetWorthCard address={address} />
        <PortfolioPie tokens={data.result} />
      </div>

      <TokensPortfolioList tokens={data.result} address={address} />
    </div>
  );
}
