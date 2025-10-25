"use client";

import { cn } from "@/lib/utils";
import { useTokensList } from "@/util/hooks/useTokensList";

import Image from "next/image";
import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { TokenDetailsInfo } from "./token-details-info";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetailsCard({ id, className }: Props) {
  // THIS IS NOT NOT GOING TO work because what if the token is NOT in the first page of the list
  const { data, isLoading, isError } = useTokensList();

  if (isLoading) {
    return <Spinner className="mx-auto mt-2" />;
  }

  if (isError) {
    return <div className="mt-2">There was an error loading token data...</div>;
  }

  const token = data?.pages.flat().find((t) => t.id === id)!;

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
