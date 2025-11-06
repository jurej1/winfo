import { addManyTokens, InsertTokenDB } from "@w-info-sst/db";

interface TokenInfo {
  token: {
    logo: string;
    address: string;
    symbol: string;
    name?: string;
    decimals?: number;
    chainId?: number;
  };
  price: string;
  change1h: string;
  change24h: string;
  changeByTime: string;
  numTxsByTime: string;
  volByTime: string;
  age: string;
  liquidity: string;
  marketCap: string;
  numHolders: string;
  timeframe: string;
}

interface MatchaTokensResponse {
  type: "success" | "error";
  data: TokenInfo[];
}

// Helper function to remove null bytes from strings
const cleanString = (str: string | undefined | null): string => {
  if (!str) return "";
  return str.replace(/\u0000/g, "");
};

(async () => {
  const url =
    "https://matcha.xyz/api/discovery/tokens?sortBy=marketCap&sortDirection=desc&timeframe=24&page=1&preset=popular&shouldError=false&pageDiscovery=false&networks=1";

  const response = await fetch(url);

  const bodyResponse = (await response.json()) as MatchaTokensResponse;

  console.log("response length:", bodyResponse.data.length);

  const tokensOnly: InsertTokenDB[] = bodyResponse.data
    .map((token) => ({
      address: cleanString(token.token.address),
      name: cleanString(token.token.name),
      logo: cleanString(token.token.logo),
      symbol: cleanString(token.token.symbol),
      chainId: token.token.chainId ?? 1,
      decimals: token.token.decimals ?? 18,
    }))
    .filter(
      (token) =>
        token.address &&
        token.name &&
        token.logo &&
        token.symbol &&
        token.chainId &&
        token.decimals !== undefined,
    );

  console.log("tokens after cleaning:", tokensOnly.length);

  await addManyTokens(tokensOnly);
})();
