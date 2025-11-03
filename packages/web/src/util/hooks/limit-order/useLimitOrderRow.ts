import {
  Extension,
  LimitOrderApiItem,
  LimitOrderV4Struct,
  LimitOrderWithFee,
  MakerTraits,
} from "@1inch/limit-order-sdk";
import { useSupportedTokens } from "../useSupportedTokens";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TokenDBwithPrice } from "@w-info-sst/db";

import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { useLocalizedFormatter } from "@/util/formatter/useLocalizedFormatter";
import { formatNumber } from "@/util/formatter/numberFormatter";
import { formatUnits } from "viem";

type UseLimitOrderRowProps = {
  order: LimitOrderApiItem;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const useLimitOrderRow = ({ order }: UseLimitOrderRowProps) => {
  const { createDateTime } = order;

  const {
    makerAsset, // selling token
    takerAsset, // buying token
    makingAmount, // selling amount
    takingAmount, // buying amount
  } = order.data;

  const { data: tokens } = useSupportedTokens();

  const { formatNumberOrString } = useLocalizedFormatter();

  const [sellingToken, setSellingToken] = useState<
    TokenDBwithPrice | undefined
  >();

  const [buyingToken, setBuyingToken] = useState<
    TokenDBwithPrice | undefined
  >();

  const wholeOrder = useCallback(() => {
    const extension = Extension.decode(order.data.extension);

    const wholeOrder = LimitOrderWithFee.fromDataAndExtension(
      order.data as LimitOrderV4Struct,
      extension,
    );

    return wholeOrder;
  }, [order]);

  const limitOrderMakerTraits = useMemo(() => {
    const makerTraits = wholeOrder().makerTraits;

    const isPartialFillAllowed = makerTraits.isPartialFillAllowed();
    const isMultipleFillsAllowed = makerTraits.isMultipleFillsAllowed();

    return {
      isPartialFillAllowed,
      isMultipleFillsAllowed,
      hasExtension: makerTraits.hasExtension(),
      usePermit2: makerTraits.isPermit2(),
    };
  }, [wholeOrder]);

  const timeDifferenceFormatted = useMemo(() => {
    const expiration = wholeOrder().makerTraits.expiration();

    if (expiration) {
      const expirationDate = new Date(Number(expiration) * 1000);
      const now = new Date();

      let diffMs = expirationDate.getTime() - now.getTime();
      if (diffMs < 0) diffMs = 0;

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      diffMs -= days * 1000 * 60 * 60 * 24;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      diffMs -= hours * 1000 * 60 * 60;

      const minutes = Math.floor(diffMs / (1000 * 60));

      // Show days and hours only if they are more than 0
      let result = "";
      if (days > 0) {
        result += `${days}d `;
      }
      if (hours > 0) {
        result += `${hours}h `;
      }
      result += `${minutes}min`;
      return result;
    } else if (!expiration) {
      return undefined;
    } else {
      return "-";
    }
  }, [wholeOrder]);

  const orderExpirationDateFormatted = useCallback(() => {
    const expiration = wholeOrder().makerTraits.expiration();

    if (expiration) {
      return new Date(Number(expiration) * 1000).toLocaleString(
        undefined,
        DATE_FORMAT,
      );
    } else {
      return "Does not expire";
    }
  }, [wholeOrder]);

  const createDateFormatted = useCallback(() => {
    if (createDateTime) {
      return new Date(createDateTime).toLocaleString(undefined, DATE_FORMAT);
    } else {
      return "-";
    }
  }, [createDateTime]);

  useEffect(() => {
    if (tokens) {
      const sellingToken = tokens.find(
        (token) => token.address.toLowerCase() === makerAsset.toLowerCase(),
      );

      setSellingToken(sellingToken);

      const buyingToken = tokens.find(
        (token) => token.address.toLowerCase() === takerAsset.toLowerCase(),
      );

      setBuyingToken(buyingToken);
    }
  }, [tokens, setSellingToken, setBuyingToken]);

  const buyingAmountFormatted = useFormattedBigNumber({
    decimals: buyingToken?.decimals,
    value: BigInt(takingAmount),
  });

  const amountUsd = (
    token: TokenDBwithPrice | undefined,
    amount: string | number | bigint | undefined,
  ) =>
    useMemo(() => {
      if (token?.decimals && token.priceUsd && amount) {
        const val = Number(formatUnits(BigInt(amount), token.decimals));
        const valUsd = val * token.priceUsd;
        return formatNumberOrString({
          value: valUsd,
          type: NumberType.FiatTokenPrice,
        });
      }
      return "$x.xx";
    }, [token?.priceUsd, amount, token?.decimals]);

  const buyingAmountUsd = amountUsd(buyingToken, takingAmount);
  const sellingAmountUsd = amountUsd(sellingToken, makingAmount);

  const sellingAmountFormatted = useFormattedBigNumber({
    decimals: sellingToken?.decimals,
    value: BigInt(makingAmount),
    type: NumberType.TokenTx,
  });

  return {
    sellingToken,
    buyingToken,
    buyingAmountFormatted,
    sellingAmountFormatted,
    buyingAmountUsd,
    sellingAmountUsd,
    orderExpirationDate: orderExpirationDateFormatted,
    createDateFormatted,
    timeDifferenceFormatted,
    limitOrderMakerTraits,
  };
};
