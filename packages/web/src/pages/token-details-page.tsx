"use client";

import Chart from "@/components/chart";
import TokenDetails from "@/components/token-details";
import { Spinner } from "@/components/ui/spinner";
import { useTokensList } from "@/util/hooks/useTokensList";
import { Divide } from "lucide-react";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  const { data, isLoading, isError } = useTokensList();

  const token = data?.pages.flat().find((t) => t.id === id);

  const Loading = () => <Spinner className="mx-auto mt-2" />;

  const Error = () => (
    <div className="mt-2">There was an error loading token data...</div>
  );

  return (
    <div className="m-auto flex max-w-7xl">
      {isLoading && <Loading />}
      {isError && <Error />}
      {token && (
        <div className="flex w-full flex-col">
          <Chart token={token} />

          <TokenDetails className="mt-10" token={token} />
        </div>
      )}
    </div>
  );
}
