import { Address, MakerTraits } from "@1inch/limit-order-sdk";
import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { limitOrderSdk } from "./limit-order-sdk";

export const createOneInchLimitOrder = ({
  chainId,
  maker,
  makerAsset,
  takerAsset,
  makingAmount,
  takingAmount,
  expiration,
}: CreateOneInchOrderParams) => {
  const sdk = limitOrderSdk(chainId);

  const makerTraits = MakerTraits.default()
    .withExpiration(BigInt(expiration))
    .allowPartialFills()
    .allowMultipleFills();

  const order = sdk.createOrder(
    {
      makerAsset: new Address(makerAsset),
      takerAsset: new Address(takerAsset),
      makingAmount: BigInt(makingAmount),
      takingAmount: BigInt(takingAmount),
      maker: new Address(maker),
    },
    makerTraits,
  );

  return order;
};
