"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: "W-info",
  projectId: "3626a3f46c91a37ac5462c34284b5820",
  chains: [mainnet, bsc],
});
