"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import { Card, CardContent } from "./card";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type WalletDisconnectedProps = {
  title?: string;
  message?: string;
};

export function WalletDisconnected({
  title = "Wallet Not Connected",
  message = "Connect your wallet to access this feature",
}: WalletDisconnectedProps) {
  return (
    <div className="mx-auto mt-8 max-w-2xl px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <Card variant="glass" className="min-h-[400px]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <motion.div
              variants={fadeInUp}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple-100 to-accent-blue-100 dark:from-accent-purple-900/30 dark:to-accent-blue-900/30"
            >
              <FaWallet className="h-8 w-8 text-accent-purple-600 dark:text-accent-purple-400" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="mb-2 text-xl font-semibold"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mb-8 text-center text-sm text-muted-foreground"
            >
              {message}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <ConnectButton />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
