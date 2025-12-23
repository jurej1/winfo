"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent-purple-50/30 dark:to-accent-purple-950/20" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-purple-500/30 to-accent-blue-500/20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-blue-500/25 to-accent-cyan-500/15 blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-accent-purple-400/20 to-accent-blue-400/15 blur-3xl"
        animate={{
          y: [0, 20, -20, 0],
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-accent-cyan-500/20 to-accent-purple-500/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
