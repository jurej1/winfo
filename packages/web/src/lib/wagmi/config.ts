"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "W-info",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains: [mainnet, bsc],
});
