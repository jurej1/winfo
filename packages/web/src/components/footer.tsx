"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";

export default function Footer() {
  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="glass-subtle border-t border-white/20 dark:border-white/10 px-6 py-8 text-sm text-muted-foreground"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={30}
            className="text-primary-dark-900"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-accent-purple-500 to-accent-blue-500 opacity-50" />
          <span>© {new Date().getFullYear()} Wallet Info. All rights reserved.</span>
        </div>
      </div>
    </motion.footer>
  );
}
