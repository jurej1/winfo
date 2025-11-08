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
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl" />

      {isLoading && <Loader />}
      {data && (
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Header Section */}
          <div className="space-y-6">
            {/* Address Section */}
            <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <FaWallet className="text-slate_gray-DEFAULT h-4 w-4" />
                <span className="text-slate_gray-DEFAULT text-xs font-semibold tracking-wider uppercase">
                  Wallet Address
                </span>
              </div>
              <div className="flex items-center gap-3">
                <code className="text-onyx-DEFAULT flex-1 truncate rounded-lg bg-white/80 px-3 py-2 font-mono text-sm">
                  {address}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="hover:bg-slate_gray-DEFAULT shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 hover:text-white"
                >
                  <IoIosCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Net Worth Section */}
            <div className="from-slate_gray-DEFAULT to-outer_space-DEFAULT rounded-2xl bg-gradient-to-br p-6 shadow-lg">
              <span className="text-onyx-DEFAULT mb-2 block text-sm font-semibold tracking-wider uppercase">
                Total Net Worth
              </span>
              <div className="flex items-baseline gap-2">
                <span className="bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-6xl font-bold text-transparent">
                  ${data.total_networth_usd}
                </span>
                <span className="text-2xl text-slate-500">USD</span>
              </div>
            </div>
          </div>

          {/* Chain Breakdown Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-slate_gray-DEFAULT mb-4 text-sm font-semibold tracking-wider uppercase">
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
                    className="group/chain rounded-xl bg-white/60 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/80 hover:shadow-md"
                    key={chain.chain}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-onyx-DEFAULT font-bold tracking-wide uppercase">
                        {chain.chain}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-slate_gray-DEFAULT text-lg font-semibold">
                          ${chain.networth_usd}
                        </span>
                        <span className="bg-slate_gray-DEFAULT/10 text-slate_gray-DEFAULT rounded-full px-2 py-0.5 text-xs font-bold">
                          {pNetWorth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={pNetWorth}
                      className="bg-platinum-DEFAULT h-2"
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
