export type CreateOneInchOrderParams = {
  chainId: number;
  maker: string;
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  expiration: number;
};
