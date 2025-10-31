import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { Button } from "../ui/button";
import { useLimitOrderExecute } from "@/util/hooks/limit-order/useLimitOrderExecute";

type Props = {
  orderParams: CreateOneInchOrderParams | undefined;
};

export function DexLimitOrderSubmit({ orderParams }: Props) {
  const { execute } = useLimitOrderExecute({ order: orderParams });

  return (
    <Button className="w-full cursor-pointer py-7 text-lg" onClick={execute}>
      Place Limit Order
    </Button>
  );
}
