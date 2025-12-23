"use client";

import { Address } from "viem";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { IoIosCopy } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useWalletNetWorth } from "@/util/hooks/wallet/useWalletNetWorth";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass-elevated" className="h-full">
        <CardContent className="pt-6">
          {isLoading && <Loader />}
          {data && (
            <div className="flex h-full flex-col justify-between space-y-6">
              {/* Address Section */}
              <div className="glass-subtle rounded-lg p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FaWallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Wallet Address
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <code className="glass-subtle flex-1 truncate rounded px-3 py-2 font-mono text-sm">
                    {address}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="shrink-0 cursor-pointer transition-all duration-150 hover:bg-accent-purple-50 dark:hover:bg-accent-purple-950/30"
                  >
                    <IoIosCopy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Net Worth Section */}
              <div className="rounded-lg bg-gradient-to-br from-accent-purple-600 to-accent-blue-600 p-6">
                <span className="mb-2 block text-xs font-medium text-white/70">
                  Total Net Worth
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    ${data.total_networth_usd}
                  </span>
                  <span className="text-lg text-white/70">USD</span>
                </div>
              </div>

              {/* Chain Breakdown Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
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
                        className="glass-subtle rounded-lg p-4 transition-all duration-150 hover:shadow-sm"
                        key={chain.chain}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-medium">
                            {chain.chain}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-semibold">
                              ${chain.networth_usd}
                            </span>
                            <span className="rounded-full bg-accent-purple-100 px-2 py-0.5 text-xs font-medium text-accent-purple-700 dark:bg-accent-purple-950/50 dark:text-accent-purple-300">
                              {pNetWorth.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={pNetWorth}
                          className="h-2 bg-neutral-200 dark:bg-neutral-700"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

const Loader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
};
