import { SelectTokenDB } from "../../../db/src/types/tokens.type";

export type TokenDBwithData = SelectTokenDB & {
  usdPrice: number;
  possibleSpam: boolean;
  percentChange24h: string;
  verifiedContract: boolean;
  securityScore: number;
};
