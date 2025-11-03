import { Address } from "@1inch/limit-order-sdk";
import { oneInchApi } from "./api";

export const getLimitOrdersForWallet = (chainId: number, address: string) =>
  oneInchApi(chainId).getOrdersByMaker(new Address(address));
