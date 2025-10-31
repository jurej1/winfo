import { LimitOrderWithFee } from "@1inch/limit-order-sdk";
import { oneInchSdk } from "./sdk";

export const submitOneInchLimitOrder = (
  chainId: number,
  order: LimitOrderWithFee,
  signature: string,
) => oneInchSdk(chainId).submitOrder(order, signature);
