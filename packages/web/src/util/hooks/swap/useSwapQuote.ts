import { getQuote } from "@/util/api/swap";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { GetQuote0XResponse, GetQuote0XParams } from "@w-info-sst/types";

type SwapQuoteOptions = UseMutationOptions<
  GetQuote0XResponse,
  Error,
  GetQuote0XParams
>;

export const useSwapQuote = (options?: SwapQuoteOptions) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useMutation({
    mutationKey: ["swap-quote"],
    mutationFn: getQuote,
    gcTime: FIVE_MINUTES,
    ...options,
  });
};
