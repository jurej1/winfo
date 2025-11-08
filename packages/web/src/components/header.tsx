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
  // {
  //   href: "/token",
  //   label: "Token",
  // },
  {
    href: "/transactions",
    label: "Transactions",
  },
  // {
  //   href: "/",
  //   label: "NFTs",
  // },
  {
    href: "/dex",
    label: "DEX",
  },
];

export default function Header() {
  const DesktopNav = () => (
    <nav aria-label="Main navigation" className="hidden md:flex">
      <ul className="flex items-center gap-x-4 font-bold text-white">
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
    <header className="from-seasalt-100 to-seasalt-200 sticky top-0 z-20 flex items-center justify-between bg-gradient-to-r from-80% px-5 py-3 shadow">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={30}
        className="text-black"
        draggable={false}
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
    <li className="group flex flex-col items-center">
      <Link href={href}>{label}</Link>
      <div className="bg-seasalt-500 h-0.5 w-0 rounded-full transition-all duration-200 ease-out group-hover:w-full" />
    </li>
  );
};
