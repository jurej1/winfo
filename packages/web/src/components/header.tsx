"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className="flex justify-end px-5 py-2">
      <ConnectButton />
    </div>
  );
}
