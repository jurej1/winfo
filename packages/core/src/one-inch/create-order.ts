import { Address, MakerTraits } from "@1inch/limit-order-sdk";
import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { oneInchSdk } from "./sdk";

const UINT_40_MAX = (1n << 48n) - 1n;

export const createOneInchLimitOrder = ({
  chainId,
  maker,
  makerAsset,
  takerAsset,
  makingAmount,
  takingAmount,
  expiration,
}: CreateOneInchOrderParams) => {
  const sdk = oneInchSdk(1);

  const makerTraits = MakerTraits.default().withExpiration(BigInt(expiration));

  return sdk.createOrder(
    {
      makerAsset: new Address("0xdAC17F958D2ee523a2206206994597C13D831ec7"), // USDT
      takerAsset: new Address("0x111111111117dc0aa78b770fa6a738034120c302"), // 1INCH
      makingAmount: 100_000000n, // 100 USDT (6 decimals)
      takingAmount: 10_00000000000000000n, // 10 1INCH (18 decimals)
      maker: new Address(maker),
    },
    makerTraits,
  );
};
