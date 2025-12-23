"use client";

import { useAccount } from "wagmi";
import WalletPage from "@/components/pages/wallet-page";
import { LandingPage } from "@/components/landing/landing-page";

export default function Home() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <LandingPage />;
  }

  return <WalletPage />;
}
