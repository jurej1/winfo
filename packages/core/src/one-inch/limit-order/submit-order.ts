import { LimitOrderWithFee } from "@1inch/limit-order-sdk";
import { limitOrderSdk } from "./limit-order-sdk";

export const submitOneInchLimitOrder = (
  chainId: number,
  order: LimitOrderWithFee,
  signature: string,
) => limitOrderSdk(chainId).submitOrder(order, signature);
