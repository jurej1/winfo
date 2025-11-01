import { EIP712TypedData, LimitOrderV4Struct, Extension } from "@1inch/limit-order-sdk";

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
  orderData: LimitOrderV4Struct; // Serialized order data for reconstruction
  extension: Extension; // Serialized extension for reconstruction
  typedData: EIP712TypedData;
  orderHash: string;
};

export type SubmitOneInchOrderParams = {
  chainId: number;
  orderData: LimitOrderV4Struct;
  extension: Extension;
  signature: string;
};
