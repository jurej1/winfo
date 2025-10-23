"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-20 flex justify-between bg-white px-5 py-2 shadow">
      <div className="flex items-center gap-x-2 bg-yellow-50 text-blue-400">
        <Link href="/">Wallet</Link>
        <Link href="/token">Token</Link>
      </div>
      <ConnectButton />
    </div>
  );
}
