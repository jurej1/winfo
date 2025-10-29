import { addSwapTransaction } from "@/util/api/swap";
import { useMutation } from "@tanstack/react-query";

export const useSwapAddTransaction = () => {
  return useMutation({
    mutationFn: addSwapTransaction,
  });
};
