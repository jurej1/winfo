"use client";

import { useWalletNetWorth } from "@/util/api/hooks/useWalletNetWorth";
import { Address } from "viem";
import { Progress } from "../ui/progress";
import { useAccount } from "wagmi";
import { add } from "date-fns";
import { Button } from "../ui/button";
import { IoIosCopy } from "react-icons/io";
import { toast } from "sonner";

type Props = {
  address: Address;
};

export function NetWorthCard({ address }: Props) {
  const { data, isLoading, error } = useWalletNetWorth(address);

  const chainNetWorthPercentage = (total: string, chain: string) => {
    return (Number(chain) / Number(total)) * 100;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    toast.success("Address copied");
  };

  return (
    <div className="m-2 h-full w-full rounded-2xl border p-3 shadow">
      {isLoading && <span>LOADING...</span>}
      {data && (
        <div className="flex h-full flex-col items-center justify-center font-bold">
          <div className="flex w-full flex-col pl-4">
            <span className="text-sm text-gray-400 uppercase">Address</span>

            <div className="flex items-center gap-2">
              <span className="text-md lowercase">{address}</span>
              <Button variant="outline" onClick={copyToClipboard}>
                <IoIosCopy />
              </Button>
            </div>

            <span className="mt-2 text-sm text-gray-400 uppercase">
              Net Worth
            </span>
            <span className="text-7xl">{data.total_networth_usd}$</span>
          </div>
          <div className="flex w-full flex-col px-12">
            {data.chains.map((chain) => {
              const pNetWorth = chainNetWorthPercentage(
                data.total_networth_usd,
                chain.networth_usd,
              );
              return (
                <div className="flex flex-col items-center" key={chain.chain}>
                  <span className="uppercase">{chain.chain}</span>
                  <div className="flex w-full items-center gap-2 px-8">
                    <span>${chain.networth_usd}</span>
                    <Progress value={pNetWorth} />
                    <span>{pNetWorth.toFixed(1)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
