import { TokenResult } from "@w-info-sst/types";
import { PortfolioTokenCard } from "./portfolio-token-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Address } from "viem";
import { shortenAddress } from "@/lib/shorten-address";
import Image from "next/image";

type Props = {
  tokens: TokenResult[];
  address: Address;
};

export function TokensPortfolioList({ tokens, address }: Props) {
  return (
    <Table>
      <TableCaption>Token holdings for {shortenAddress(address)} </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price (24H)</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Share</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => (
          <PortfolioTokenCard key={token.token_address} token={token} />
        ))}
      </TableBody>
    </Table>
  );
}
