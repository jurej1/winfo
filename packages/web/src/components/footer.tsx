import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-8 text-sm text-neutral-600">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={30}
            className="text-primary-dark-900"
          />
          <span className="text-neutral-500">
            Built with SST and powered by Neon, Moralis, CoinGecko, 0x, and 1inch.
          </span>
        </div>
        <div className="text-neutral-400">
          © {new Date().getFullYear()} Wallet Info. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
