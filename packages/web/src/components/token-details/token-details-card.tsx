"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TokenDetailsInfo } from "./token-details-info";
import { useTokensList } from "@/util/hooks/useTokensList";
import { LoadingCard } from "../ui/loading-card";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetailsCard({ id, className }: Props) {
  const { data, isLoading, isError, error } = useTokensList();

  if (isLoading) {
    return <LoadingCard message="Loading token details..." />;
  }

  const token = data?.pages.flat().find((token) => token.id === id);

  if (isError || !token) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "We couldn't load this token's information.";

    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <div className="rounded-full bg-destructive/10 p-3 text-destructive">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-neutral-900">
          Token Not Found
        </h2>
        <p className="mt-2 max-w-md text-sm text-neutral-600">
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="border-b border-neutral-100">
        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Token Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TokenDetailsInfo token={token} />
      </CardContent>
    </Card>
  );
}
