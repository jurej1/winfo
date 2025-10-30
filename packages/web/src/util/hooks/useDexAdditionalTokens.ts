import { TokenDBwithPrice } from "@w-info-sst/db";
import { useMemo } from "react";

type Props = {
  tokens: TokenDBwithPrice[];
  sellToken?: TokenDBwithPrice;
  buyToken?: TokenDBwithPrice;
};

export const useDexAdditionalTokens = ({
  tokens,
  sellToken,
  buyToken,
}: Props) => {
  return useMemo(() => {
    const limit = tokens.slice(0, 6);

    const filtered = limit.filter((token) => {
      if (
        token.address != sellToken?.address &&
        token.address != buyToken?.address
      ) {
        return true;
      }
      return false;
    });

    return filtered.slice(0, 3);
  }, [sellToken, buyToken, tokens]);
};
