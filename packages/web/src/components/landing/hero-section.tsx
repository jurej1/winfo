"use client";

import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, ArrowRight, Sparkles } from "lucide-react";
import { staggerContainer, heroText, fadeInUp } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <Sparkles className="w-4 h-4 text-accent-purple-500" />
            <span className="gradient-text">Web3 Portfolio Tracking</span>
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={heroText}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="block">Track Your</span>
          <span className="block gradient-text">Crypto Portfolio</span>
          <span className="block">Like a Pro</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Monitor your wallet balances, analyze token performance, swap assets,
          and manage approvals — all in one powerful dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="[&>button]:!h-12 [&>button]:!px-8 [&>button]:!text-base [&>button]:!rounded-xl [&>button]:!font-semibold [&>button]:gradient-primary [&>button]:!shadow-lg [&>button]:hover-glow-purple [&>button]:!transition-all">
            <ConnectButton
              label="Connect Wallet"
              showBalance={false}
            />
          </div>

          <motion.a
            href="#features"
            className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold rounded-xl border border-border bg-background/50 hover:bg-accent-purple-50 dark:hover:bg-accent-purple-950/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: "Supported Chains", value: "2+" },
            { label: "Token Tracking", value: "1000s" },
            { label: "DEX Integration", value: "Multi" },
            { label: "Real-time Data", value: "24/7" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating wallet icon */}
        <motion.div
          className="absolute -z-10 opacity-10"
          style={{ top: "10%", right: "10%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Wallet className="w-32 h-32 text-accent-purple-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
