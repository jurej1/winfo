"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInDown } from "@/lib/animations";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Wallet",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/token",
    label: "Tokens",
  },
  {
    href: "/dex",
    label: "DEX",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DesktopNav = () => (
    <nav
      aria-label="Main navigation"
      className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
    >
      <ul className="flex items-center gap-x-8">
        {navItems.map((item) => (
          <AnimatedLinkItem
            href={item.href}
            label={item.label}
            key={item.href}
          />
        ))}
      </ul>
    </nav>
  );

  return (
    <motion.header
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled
          ? "glass-strong shadow-glass border-b border-white/20 dark:border-white/10"
          : "bg-transparent"
      )}
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={30}
        className="text-primary-dark-900"
      />

      <DesktopNav />

      <div className="[&>button]:!rounded-lg [&>button]:!font-medium [&>button]:hover:!shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <ConnectButton />
      </div>
    </motion.header>
  );
}

export const AnimatedLinkItem = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <li className="group relative">
      <Link
        href={href}
        className="hover:text-accent-purple-600 dark:hover:text-accent-purple-400 text-sm font-medium text-foreground/70 transition-colors duration-150"
      >
        {label}
      </Link>
      <div className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-accent-purple-500 to-accent-blue-500 transition-all duration-200 ease-out group-hover:w-full" />
    </li>
  );
};
