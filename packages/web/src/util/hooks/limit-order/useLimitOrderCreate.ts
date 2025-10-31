import { useMutation } from "@tanstack/react-query";
import { createLimitOrder } from "../../api/limit-orders";

export const useLimitOrderCreate = () => {
  return useMutation({
    mutationFn: createLimitOrder,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
    onMutate: (variables) => {},
    mutationKey: ["limit-order-create"],
  });
};
