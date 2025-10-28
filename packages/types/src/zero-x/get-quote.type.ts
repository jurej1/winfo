import { GetPrice0XParams } from "./get-price.type";

export type GetQuote0XParams = GetPrice0XParams;

export type GetQuote0XResponse = {
  name?: string; // error name in case something goes wrong
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: {
    integratorFee: null;
    zeroExFee: null;
    gasFee: null;
  };
  issues: {
    allowance: {
      actual: string;
      spender: string;
    };
    balance: Record<string, never>;
    simulationIncomplete: boolean;
    invalidSourcesPassed: Array<string>;
  };
  liquidityAvailable: boolean;
  minBuyAmount: string;
  permit2: {
    type: string;
    hash: string;
    eip712: Record<string, never>;
  };
  route: {
    fills: Array<{
      from: string;
      to: string;
      source: string;
      proportionBps: string;
    }>;
    tokens: Array<{
      address: string;
      symbol: string;
    }>;
  };
  sellAmount: string;
  sellToken: string;
  tokenMetadata: {
    buyToken: {
      buyTaxBps: string;
      sellTaxBps: string;
    };
    sellToken: {
      buyTaxBps: string;
      sellTaxBps: string;
    };
  };
  totalNetworkFee: string;
  transaction: {
    to: `0x${string}`;
    data: `0x${string}`;
    gas: bigint | null | undefined;
    gasPrice: bigint | undefined;
    value: bigint | undefined;
  };
  zid: string;
};
