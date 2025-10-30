import { DexCardHeader } from "../dex-swap";
import { Card, CardHeader } from "../ui/card";

export function DexLimitOrderCard() {
  return (
    <Card>
      <CardHeader>
        <DexCardHeader title={"Limit Order"} isLoading={false} />
      </CardHeader>
    </Card>
  );
}
