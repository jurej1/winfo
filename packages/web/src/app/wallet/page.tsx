"use client";

import { useAccount } from "wagmi";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/wallet/portfolio-grid";

export default function Page() {
  const { address } = useAccount();

  const copyToCLipboard = async () => {
    await navigator.clipboard.writeText(address ?? "");
    toast.success("Copied to clipboard");
  };

  if (!address) return <div>Please connect your wallet...</div>;

  return (
    <div className="m-auto flex max-w-7xl p-2">
      <div className="flex w-full flex-col gap-y-2 rounded-xl bg-white p-4 shadow-lg">
        {/* HEADER */}
        <h1 className="e font-bold underline">Wallet Address: </h1>
        <div className="flex items-center gap-x-4">
          <h1>{address}</h1>
          <Button onClick={copyToCLipboard}>Copy</Button>
        </div>

        {/* PORTFOLIO */}
        <PortfolioGrid address={address} />
      </div>
    </div>
  );
}
