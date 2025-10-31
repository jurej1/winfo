import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useCallback } from "react";
import { useLimitOrderCreate } from "./useLimitOrderCreate";
import { useSignTypedData } from "wagmi";
import { useLimitOrderSubmit } from "./useLimitOrderSubmit";

type UseLimitOrderExecuteProps = {
  order: CreateOneInchOrderParams | undefined;
};

export const useLimitOrderExecute = ({ order }: UseLimitOrderExecuteProps) => {
  const { mutateAsync: createLimitOrder } = useLimitOrderCreate();

  const { mutateAsync: submitLimitOrder } = useLimitOrderSubmit();

  const { signTypedDataAsync } = useSignTypedData();

  const execute = useCallback(async () => {
    if (!order) return;
    // 1. POST /limit-orders/create
    const createOrderResponse = await createLimitOrder(order);

    // 2. signTypedData
    const { typedData, order: responseOrder } = createOrderResponse;

    const signature = await signTypedDataAsync(typedData);

    // 3. POST /limit-orders/submit
    await submitLimitOrder({
      chainId: order.chainId,
      order: responseOrder,
      signature,
    });
  }, [order, createLimitOrder, submitLimitOrder, signTypedDataAsync]);

  return {
    execute,
  };
};
