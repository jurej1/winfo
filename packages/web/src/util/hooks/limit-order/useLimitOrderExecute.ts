import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useCallback, useState } from "react";
import { useLimitOrderCreate } from "./useLimitOrderCreate";
import { useSignTypedData } from "wagmi";
import { useLimitOrderSubmit } from "./useLimitOrderSubmit";
import { toast } from "sonner";
import { TransactionExecutionError, UserRejectedRequestError } from "viem";

type UseLimitOrderExecuteProps = {
  order: CreateOneInchOrderParams | undefined;
};

export const useLimitOrderExecute = ({ order }: UseLimitOrderExecuteProps) => {
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createLimitOrder } = useLimitOrderCreate();

  const { mutateAsync: submitLimitOrder } = useLimitOrderSubmit();

  const { signTypedDataAsync } = useSignTypedData();

  const execute = useCallback(async () => {
    if (!order) return;

    setLoading(true);
    // 1. POST /limit-orders/create
    try {
      const createOrderResponse = await createLimitOrder(order);

      // 2. signTypedData
      const { typedData, orderData, extension } = createOrderResponse;

      const signature = await signTypedDataAsync(typedData);

      // 3. POST /limit-orders/submit
      // Send the serialized orderData and extension to reconstruct the order on the backend
      await submitLimitOrder({
        chainId: order.chainId,
        orderData,
        extension,
        signature,
      });
    } catch (error) {
      const isDenied =
        error instanceof UserRejectedRequestError ||
        error instanceof TransactionExecutionError;

      if (isDenied) {
        toast.error("Denied 😭");
      } else {
        toast.error("Failed to execute limit order");
      }
    } finally {
      setLoading(false);
    }
  }, [
    order,
    createLimitOrder,
    submitLimitOrder,
    signTypedDataAsync,
    setLoading,
  ]);

  return {
    execute,
    isLoading: loading,
  };
};
