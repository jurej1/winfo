"use client";

import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { TokenDetailsInfo } from "./token-details-info";
import { useTokenPrice } from "@/util/hooks/useTokenPrice";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetailsCard({ id, className }: Props) {
  const { data: token, isLoading, isError } = useTokenPrice(id);

  if (isLoading) {
    return <Spinner className="mx-auto mt-2" />;
  }

  if (isError || !token) {
    return <div className="mt-2">There was an error loading token data...</div>;
  }

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-[1fr_1fr]">
          <TokenDetailsInfo token={token} />
        </div>
      </CardContent>
    </Card>
  );
}
