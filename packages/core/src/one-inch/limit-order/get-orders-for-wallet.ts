import { Address } from "@1inch/limit-order-sdk";
import { limitOrderApi } from "./limit-order-api";

export const getLimitOrdersForWallet = (chainId: number, address: string) =>
  limitOrderApi(chainId).getOrdersByMaker(new Address(address), {
    statuses: [1], // only valid orders
  });
