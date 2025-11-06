import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { Button } from "../ui/button";
import { useLimitOrderExecute } from "@/util/hooks/limit-order/useLimitOrderExecute";
import { Spinner } from "../ui/spinner";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useEffect, useState } from "react";
import { DexLimitOrderSubmitStatus } from "./dex-limit-order-submit-status";
import { DexLimitOrderNativeWarning } from "./dex-limit-order-native-warning";

type Props = {
  orderParams: CreateOneInchOrderParams | undefined;
  sellToken: TokenDBwithPrice | undefined;
  buyToken: TokenDBwithPrice | undefined;
};

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export function DexLimitOrderSubmit({
  orderParams,
  sellToken,
  buyToken,
}: Props) {
  const [isAnyNative, setIsAnyNative] = useState(false);

  const { execute, isPending, status } = useLimitOrderExecute({
    order: orderParams,
    sellToken: sellToken,
  });

  useEffect(() => {
    if (
      buyToken?.address === nativeAddress ||
      sellToken?.address === nativeAddress
    ) {
      setIsAnyNative(true);
    } else {
      setIsAnyNative(false);
    }
  }, [setIsAnyNative, buyToken, sellToken]);

  return (
    <div className="flex w-full flex-col">
      <Button
        className="w-full cursor-pointer py-7 text-lg"
        onClick={execute}
        disabled={!orderParams || isPending || isAnyNative}
      >
        Confirm
      </Button>

      <DexLimitOrderSubmitStatus status={status} open={isPending} />

      <DexLimitOrderNativeWarning show={isAnyNative} />
    </div>
  );
}
