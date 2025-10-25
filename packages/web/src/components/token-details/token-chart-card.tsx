"use client";

import { useTokenChart } from "@/util/hooks/useTokenChart";
import { OHLCDaysFilter } from "@w-info-sst/types";
import { useState } from "react";

import { TokenChartTimeframeSelector } from "./token-chart-timeframe-selector";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import { TokenLineChart } from "./token-line-chart";

type Props = {
  id: string;
};

export function TokenChartCard({ id }: Props) {
  const [timeframe, setTimeframe] = useState<OHLCDaysFilter>("7");

  const { data } = useTokenChart(id, timeframe);

  return (
    <Card>
      <CardHeader>
        <CardAction>
          <TokenChartTimeframeSelector
            onSelected={setTimeframe}
            val={timeframe}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        {data && <TokenLineChart data={data} timeframe={timeframe} />}
      </CardContent>
    </Card>
  );
}
