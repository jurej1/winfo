import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { Button } from "../ui/button";
import { useLimitOrderExecute } from "@/util/hooks/limit-order/useLimitOrderExecute";
import { Spinner } from "../ui/spinner";

type Props = {
  orderParams: CreateOneInchOrderParams | undefined;
};

export function DexLimitOrderSubmit({ orderParams }: Props) {
  const { execute, isLoading } = useLimitOrderExecute({ order: orderParams });

  return (
    <Button
      className="w-full cursor-pointer py-7 text-lg"
      onClick={execute}
      disabled={!orderParams || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner /> Loading...
        </div>
      ) : (
        "Place Limit Order"
      )}
    </Button>
  );
}
