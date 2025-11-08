import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";

type WalletDisconnectedProps = {
  title?: string;
  message?: string;
};

export function WalletDisconnected({
  title = "Wallet Not Connected",
  message = "Connect your wallet to access this feature",
}: WalletDisconnectedProps) {
  return (
    <div className="mx-auto mt-8 max-w-2xl px-4">
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-12 shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-teal-50">
          <FaWallet className="h-8 w-8 text-accent-teal-600" />
        </div>
        
        <h2 className="mb-2 text-xl font-semibold text-primary-dark-900">
          {title}
        </h2>
        
        <p className="mb-8 text-center text-sm text-neutral-600">
          {message}
        </p>
        
        <ConnectButton />
      </div>
    </div>
  );
}

