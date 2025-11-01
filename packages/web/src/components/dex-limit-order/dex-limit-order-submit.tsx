import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { Button } from "../ui/button";
import { useLimitOrderExecute } from "@/util/hooks/limit-order/useLimitOrderExecute";
import { Spinner } from "../ui/spinner";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GoAlertFill } from "react-icons/go";
import { Goal } from "lucide-react";

type Props = {
  orderParams: CreateOneInchOrderParams | undefined;
  sellToken: TokenDBwithPrice | undefined;
  buyToken: TokenDBwithPrice | undefined;
};

export function DexLimitOrderSubmit({
  orderParams,
  sellToken,
  buyToken,
}: Props) {
  const [isAnyNative, setIsAnyNative] = useState(false);

  const { execute, isLoading } = useLimitOrderExecute({ order: orderParams });

  useEffect(() => {
    if (buyToken?.native || sellToken?.native) {
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
        disabled={!orderParams || isLoading || isAnyNative}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner /> Loading...
          </div>
        ) : (
          "Place Limit Order"
        )}
      </Button>

      <div
        className={cn("transition-all duration-200 ease-in-out", {
          "mt-2 opacity-100": isAnyNative,
          "mt-0 max-h-0 opacity-0": !isAnyNative,
        })}
        aria-hidden={!isAnyNative}
      >
        <div className="rounded-lg bg-gray-100 p-2 shadow">
          <div className="flex items-start gap-2 text-yellow-600">
            <GoAlertFill className="mt-1 leading-4" />
            <span>
              Currently, only <b>non-native</b> tokens are supported when
              creating limit orders.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
