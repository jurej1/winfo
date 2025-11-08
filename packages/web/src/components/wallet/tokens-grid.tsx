import { TokenResult } from "@w-info-sst/types";
import { PortfolioTokenCard } from "./portfolio-token-card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Address } from "viem";
import { shortenAddress } from "@/lib/shorten-address";
import { BiCoin } from "react-icons/bi";

type Props = {
  tokens: TokenResult[];
  address: Address;
};

export function TokensPortfolioList({ tokens, address }: Props) {
  return (
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <BiCoin className="text-slate_gray-DEFAULT h-5 w-5" />
            <h3 className="text-slate_gray-DEFAULT text-lg font-semibold tracking-wider uppercase">
              Token Holdings
            </h3>
          </div>
          <p className="text-outer_space-DEFAULT text-sm">
            Portfolio assets for {shortenAddress(address)}
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-platinum-300 hover:bg-transparent">
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Token
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Price (24H)
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Balance
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Portfolio %
                </TableHead>
                <TableHead className="text-onyx-DEFAULT text-right font-bold uppercase">
                  Value
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <PortfolioTokenCard key={token.token_address} token={token} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
