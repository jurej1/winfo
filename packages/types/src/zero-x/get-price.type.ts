export type GetPrice0XParams = {
  chainId: number;
  buyToken: string;
  sellToken: string;
  sellAmount: string;
  taker: string;
};

export type GetPrice0XResponse = {
  name: string; // error name in case something goes wrong
  blockNumber: string;
  buyAmount: BigInt;
  buyToken: string;
  fees: {
    integratorFee: null;
    zeroExFee: null;
    gasFee: null;
  };
  gas: string;
  gasPrice: string;
  issues: {
    allowance: {
      actual: string;
      spender: string;
    };
    balance: {
      token: string;
      actual: string;
      expected: string;
    };
    simulationIncomplete: boolean;
    invalidSourcesPassed: Array<string>;
  };
  liquidityAvailable: boolean;
  minBuyAmount: string;
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
  zid: string;
};
