"use client";

import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { TokenDetailsInfo } from "./token-details-info";
import { useTokensList } from "@/util/hooks/useTokensList";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetailsCard({ id, className }: Props) {
  const { data, isLoading, isError } = useTokensList();

  if (isLoading) {
    return <Spinner className="mx-auto mt-2" />;
  }

  const token = data?.pages.flat().find((token) => token.id === id);

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
