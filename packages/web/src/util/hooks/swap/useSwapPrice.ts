import { getPrice } from "@/util/api/swap";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { GetPrice0XParams, GetPrice0XResponse } from "@w-info-sst/types";

type SwapPriceOptions = UseMutationOptions<
  GetPrice0XResponse,
  Error,
  GetPrice0XParams
>;

export const useSwapPrice = (options?: SwapPriceOptions) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useMutation({
    mutationKey: ["swap-price"],
    mutationFn: getPrice,
    gcTime: FIVE_MINUTES,

    ...options,
  });
};
