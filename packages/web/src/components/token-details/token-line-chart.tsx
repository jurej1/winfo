import { formatCurrency } from "@coingecko/cryptoformat";
import { OHLCDaysFilter, OHLCItem } from "@w-info-sst/types";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./token-chart-tooltip";

type Props = {
  data: OHLCItem[];
  timeframe: OHLCDaysFilter;
};

export function TokenLineChart({ data, timeframe }: Props) {
  const xAxisTickFormatter = (value: number) => {
    const date = new Date(value);

    if (timeframe === "1") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div style={{ width: "100%", height: 400 }} className="p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={xAxisTickFormatter}
          />
          <YAxis
            domain={["dataMin", "dataMax"]}
            type="number"
            tickFormatter={(value) => value.toString()}
          />
          <Tooltip content={<CustomTooltip timeframe={timeframe} />} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#005EFF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
