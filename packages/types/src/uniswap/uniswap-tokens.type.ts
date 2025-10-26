export interface BridgeInfo {
  tokenAddress: string;
}

export interface BridgeMap {
  [chainId: string]: BridgeInfo;
}

export interface TokenExtensions {
  bridgeInfo?: BridgeMap;
}

export interface TokenUniswap {
  chainId: number;
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions?: TokenExtensions;
}
