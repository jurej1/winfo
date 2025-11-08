"use client";

import { Address } from "viem";
import { Progress } from "../ui/progress";

import { Button } from "../ui/button";
import { IoIosCopy } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useWalletNetWorth } from "@/util/hooks/wallet/useWalletNetWorth";

type Props = {
  address: Address;
};

export function NetWorthCard({ address }: Props) {
  const { data, isLoading } = useWalletNetWorth(address);

  const chainNetWorthPercentage = (total: string, chain: string) => {
    return (Number(chain) / Number(total)) * 100;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    toast.success("Address copied");
  };

  return (
    <div className="h-full w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {isLoading && <Loader />}
      {data && (
        <div className="flex h-full flex-col justify-between space-y-6">
          {/* Address Section */}
          <div className="rounded-lg bg-neutral-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <FaWallet className="h-4 w-4 text-neutral-500" />
              <span className="text-xs font-medium text-neutral-600">
                Wallet Address
              </span>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-primary-dark-900 flex-1 truncate rounded border border-neutral-200 bg-white px-3 py-2 font-mono text-sm">
                {address}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="shrink-0 cursor-pointer transition-all duration-150 hover:bg-neutral-100"
              >
                <IoIosCopy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Net Worth Section */}
          <div className="bg-primary-dark-900 rounded-lg p-6">
            <span className="mb-2 block text-xs font-medium text-neutral-400">
              Total Net Worth
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">
                ${data.total_networth_usd}
              </span>
              <span className="text-lg text-neutral-300">USD</span>
            </div>
          </div>

          {/* Chain Breakdown Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-600">
              Chain Distribution
            </h3>
            <div className="space-y-3">
              {data.chains.map((chain) => {
                const pNetWorth = chainNetWorthPercentage(
                  data.total_networth_usd,
                  chain.networth_usd,
                );
                return (
                  <div
                    className="rounded-lg border border-neutral-200 p-4 transition-all duration-150 hover:border-neutral-300 hover:shadow-sm"
                    key={chain.chain}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-primary-dark-900 font-medium">
                        {chain.chain}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-primary-dark-900 text-base font-semibold">
                          ${chain.networth_usd}
                        </span>
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                          {pNetWorth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={pNetWorth}
                      className="h-2 bg-neutral-100"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
};
