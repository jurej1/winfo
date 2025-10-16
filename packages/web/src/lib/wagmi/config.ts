"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: "W-info",
  projectId: `${process.env.REOWN_PROJECT_ID}`,
  chains: [mainnet, bsc],
});
