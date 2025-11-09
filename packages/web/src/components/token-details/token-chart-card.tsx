"use client";

import { useTokenChart } from "@/util/hooks/useTokenChart";
import { OHLCDaysFilter } from "@w-info-sst/types";
import { useCallback, useState } from "react";

import { TokenChartTimeframeSelector } from "./token-chart-timeframe-selector";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TokenLineChart } from "./token-line-chart";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
};

export function TokenChartCard({ id }: Props) {
  const [timeframe, setTimeframe] = useState<OHLCDaysFilter>("7");

  const { data, isLoading, isError } = useTokenChart(id, timeframe);

  const handleOnSelected = useCallback(
    (val?: OHLCDaysFilter) => {
      if (val) setTimeframe(val);
    },
    [setTimeframe],
  );

  return (
    <Card>
      <CardHeader className="border-b border-neutral-100">
        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Price Chart
        </CardTitle>
        <CardAction>
          <TokenChartTimeframeSelector
            onSelected={handleOnSelected}
            val={timeframe}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex h-[400px] items-center justify-center">
            <div className="text-center">
              <Spinner className="mx-auto mb-3 h-8 w-8" />
              <p className="text-sm text-neutral-600">Loading chart data...</p>
            </div>
          </div>
        )}
        {isError && (
          <div className="flex h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700">
                Unable to load chart
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Chart data is temporarily unavailable
              </p>
            </div>
          </div>
        )}
        {!isLoading && !isError && data && (
          <TokenLineChart data={data} timeframe={timeframe} />
        )}
        {!isLoading && !isError && !data && (
          <div className="flex h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700">
                No chart data available
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Try selecting a different timeframe
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
