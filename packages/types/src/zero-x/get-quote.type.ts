import { GetPrice0XParams } from "./get-price.type";

export type GetQuote0XParams = GetPrice0XParams & {
  slippageBps: number;
};

export type GetQuote0XResponse = {
  name?: string; // error name in case something goes wrong
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  allowanceTarget: string;
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
    eip712: {
      types: {
        PermitTransferFrom: Array<{
          name: string;
          type: string;
        }>;
        TokenPermissions: Array<{
          name: string;
          type: string;
        }>;
        EIP712Domain: Array<{
          name: string;
          type: string;
        }>;
      };
      domain: {
        name: string;
        chainId: number;
        verifyingContract: string;
      };
      message: {
        permitted: {
          token: string;
          amount: string;
        };
        spender: string;
        nonce: string;
        deadline: string;
      };
      primaryType: "PermitTransferFrom";
    };
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
