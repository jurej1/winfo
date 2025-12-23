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
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
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
                <p className="text-sm text-muted-foreground">Loading chart data...</p>
              </div>
            </div>
          )}
          {isError && (
            <div className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium">
                  Unable to load chart
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
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
                <p className="text-sm font-medium">
                  No chart data available
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try selecting a different timeframe
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
