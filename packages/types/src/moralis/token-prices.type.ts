export interface MoralisTokenPrice {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenDecimals: string;
  nativePrice?: {
    value: string;
    decimals: number;
    name: string;
    symbol: string;
    address: string;
  };
  usdPrice: number;
  usdPriceFormatted: string;
  exchangeName: string;
  exchangeAddress: string;
  tokenAddress: string;
  priceLastChangedAtBlock: string;
  blockTimestamp: string;
  possibleSpam: boolean;
  verifiedContract: boolean;
  pairAddress: string;
  pairTotalLiquidityUsd: string;
  securityScore: number;
  usdPrice24hr: number;
  usdPrice24hrUsdChange: number;
  usdPrice24hrPercentChange: number;
  "24hrPercentChange": string;
}
