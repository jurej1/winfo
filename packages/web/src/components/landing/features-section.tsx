"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  LineChart,
  ArrowLeftRight,
  History,
  Shield,
  Zap,
} from "lucide-react";
import { FeatureCard } from "./feature-card";
import { staggerContainerSlow } from "@/lib/animations";

const features = [
  {
    icon: Wallet,
    title: "Portfolio Overview",
    description:
      "Get a complete view of your crypto holdings across multiple wallets with real-time valuations and portfolio distribution.",
    gradient: "from-accent-purple-500 to-accent-purple-600",
  },
  {
    icon: LineChart,
    title: "Token Analytics",
    description:
      "Dive deep into token performance with detailed charts, price history, and market data from trusted sources.",
    gradient: "from-accent-blue-500 to-accent-blue-600",
  },
  {
    icon: ArrowLeftRight,
    title: "DEX Swaps",
    description:
      "Swap tokens directly through integrated DEX aggregators. Get the best rates across multiple liquidity sources.",
    gradient: "from-accent-purple-500 to-accent-blue-500",
  },
  {
    icon: History,
    title: "Transaction History",
    description:
      "Track all your on-chain transactions with detailed information including gas costs, timestamps, and status.",
    gradient: "from-accent-cyan-500 to-accent-blue-500",
  },
  {
    icon: Shield,
    title: "Approval Management",
    description:
      "Review and revoke token approvals to keep your wallet secure. Know exactly which contracts have access.",
    gradient: "from-accent-purple-600 to-accent-purple-700",
  },
  {
    icon: Zap,
    title: "Limit Orders",
    description:
      "Set limit orders to automatically swap tokens when your target price is reached. Trade smarter, not harder.",
    gradient: "from-accent-blue-500 to-accent-cyan-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Manage Your Crypto</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed for both beginners and experienced traders.
            Track, analyze, and trade with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
