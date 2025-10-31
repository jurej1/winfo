import { submitLimitOrder } from "@/util/api/limit-orders";
import { useMutation } from "@tanstack/react-query";

export const useLimitOrderSubmit = () => {
  return useMutation({
    mutationFn: submitLimitOrder,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
    mutationKey: ["submit-limit-order"],
  });
};
