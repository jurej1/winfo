"use client";

import { GetQuote0XResponse } from "@w-info-sst/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

type Props = {
  isLoading: boolean;
  quote: GetQuote0XResponse | undefined;
};

export function DexTokensRouteCard({ isLoading, quote }: Props) {
  const shouldShow = useCallback(() => {
    if (isLoading === false && quote === undefined) return false;
    return true;
  }, [isLoading, quote]);

  const route = useCallback(() => quote?.route, [quote?.route]);

  return (
    <Card
      className={cn("transition-all duration-200 ease-in-out", {
        "translate-x-0 opacity-100": shouldShow(),
        "-translate-x-30 opacity-0": !shouldShow(),
      })}
    >
      <CardHeader>
        <CardTitle className="flex w-full justify-between">
          Route {!shouldShow && <Spinner />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] rounded-2xl bg-blue-200/20 p-2">
          <ol className="flex flex-col">
            {route()?.tokens.map((token, index) => {
              const length = route()?.tokens.length ?? 1;
              const notLast = length - 1 != index;

              return (
                <li
                  key={token.address}
                  className={cn(
                    "flex flex-col items-center",
                    "animate-in fade-in transition-opacity duration-300",
                  )}
                >
                  <span>{token.symbol}</span>
                  {notLast && (
                    <div className="mx-auto h-6 w-1 animate-pulse rounded bg-blue-400" />
                  )}
                </li>
              );
            })}
          </ol>
          <ol className="mt-6 ml-2 flex flex-col gap-6">
            {route()?.fills.map((fill, index) => {
              const cleanSource = fill.source.replaceAll("_", " ");

              return (
                <li
                  key={fill.source + index}
                  className="animate-in fade-in text-gray-400 transition-opacity duration-300"
                >
                  {cleanSource}
                </li>
              );
            })}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
