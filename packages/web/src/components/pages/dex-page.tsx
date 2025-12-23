"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DexLimitOrderCard } from "../dex-limit-order/dex-limit-order-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";
import { DexRecentTransactions } from "../dex-swap";
import { DexWalletLimitOrders } from "../dex-limit-order/dex-wallet-limit-orders";
import { WalletDisconnected } from "../ui/wallet-disconnected";
import { useAccount } from "wagmi";
import { AnimatedBackground } from "../landing/animated-background";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function DexPage() {
  const { address, chainId } = useAccount();

  if (!address || !chainId) {
    return (
      <WalletDisconnected
        title="Wallet Not Connected"
        message="Connect your wallet to access decentralized exchange features, swap tokens, and create limit orders"
      />
    );
  }

  return (
    <>
      <AnimatedBackground />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-7xl flex-col gap-6 p-6"
      >
        <Tabs defaultValue="swap">
          <motion.div variants={fadeInUp} className="mx-auto flex w-lg">
            <TabsList className="glass">
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="limit-order">Limit Order</TabsTrigger>
            </TabsList>
          </motion.div>
          <div className="mt-4">
            <TabsContent value="swap">
              <motion.div variants={fadeInUp} className="mx-auto w-lg">
                <DexSwapComponent />
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-6">
                <DexRecentTransactions />
              </motion.div>
            </TabsContent>
            <TabsContent value="limit-order">
              <motion.div variants={fadeInUp} className="mx-auto w-lg">
                <DexLimitOrderCard />
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-6">
                <DexWalletLimitOrders />
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </>
  );
}
