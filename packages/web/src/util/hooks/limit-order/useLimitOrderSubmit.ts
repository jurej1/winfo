import { submitLimitOrder } from "@/util/api/limit-orders";
import { useMutation } from "@tanstack/react-query";

export const useLimitOrderSubmit = () => {
  return useMutation({
    mutationFn: submitLimitOrder,
    mutationKey: ["submit-limit-order"],
  });
};
