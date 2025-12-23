"use client";

import TokenDetailsCard from "@/components/token-details/token-details-card";
import { TokenChartCard } from "@/components/token-details/token-chart-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";
import { AnimatedBackground } from "../landing/animated-background";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return (
    <>
      <AnimatedBackground />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:grid lg:grid-cols-[1fr_400px]"
      >
        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          <TokenDetailsCard id={id} />
          <TokenChartCard id={id} />
        </motion.div>
        <motion.div variants={fadeInUp} className="sticky top-6 self-baseline">
          <DexSwapComponent />
        </motion.div>
      </motion.div>
    </>
  );
}
