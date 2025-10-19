import { TokenResult } from "@w-info-sst/types";
import { PortfolioTokenCard } from "./portfolio-token-card";

type Props = {
  tokens: TokenResult[];
};

export function TokensPortfolioList({ tokens }: Props) {
  return (
    <ul className="flex flex-col gap-y-2 overflow-y-auto">
      {tokens.map((token) => (
        <PortfolioTokenCard key={token.token_address} token={token} />
      ))}
    </ul>
  );
}
