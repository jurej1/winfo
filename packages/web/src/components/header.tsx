"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

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
    href: "/dex",
    label: "DEX",
  },
];

export default function Header() {
  const DesktopNav = () => (
    <nav aria-label="Main navigation" className="hidden md:flex">
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
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4 shadow-sm backdrop-blur-sm">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={30}
        className="text-primary-dark-900"
      />

      <DesktopNav />

      <ConnectButton />
    </header>
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
        className="hover:text-primary-dark-900 text-sm font-medium text-neutral-600 transition-colors duration-150"
      >
        {label}
      </Link>
      <div className="bg-accent-teal-500 absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-200 ease-out group-hover:w-full" />
    </li>
  );
};
