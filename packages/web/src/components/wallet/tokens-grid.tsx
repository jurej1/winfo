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
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <BiCoin className="h-5 w-5 text-neutral-500" />
          <h3 className="text-base font-semibold text-primary-dark-900">
            Token Holdings
          </h3>
        </div>
        <p className="text-sm text-neutral-600">
          Portfolio assets for {shortenAddress(address)}
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-200 bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="font-medium text-neutral-600">
                Token
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Price (24H)
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Balance
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Portfolio %
              </TableHead>
              <TableHead className="text-right font-medium text-neutral-600">
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
  );
}
