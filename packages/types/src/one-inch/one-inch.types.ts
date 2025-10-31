import { EIP712TypedData, LimitOrderWithFee } from "@1inch/limit-order-sdk";

export type CreateOneInchOrderParams = {
  chainId: number;
  maker: string; // wallet address
  makerAsset: string; // selling
  takerAsset: string; // buying
  makingAmount: string; // selling amount
  takingAmount: string; // buying amount
  expiration: number;
};

export type CreateOneInchOrderResponse = {
  order: LimitOrderWithFee;
  typedData: EIP712TypedData;
  orderHash: string;
};

export type SubmitOneInchOrderParams = {
  chainId: number;
  order: LimitOrderWithFee;
  signature: string;
};
