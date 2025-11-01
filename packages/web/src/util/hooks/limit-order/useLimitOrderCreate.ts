import { useMutation } from "@tanstack/react-query";
import { createLimitOrder } from "../../api/limit-orders";

export const useLimitOrderCreate = () => {
  return useMutation({
    mutationFn: createLimitOrder,
    mutationKey: ["limit-order-create"],
  });
};
