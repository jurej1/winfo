"use client";

import { useTokenPrice } from "@/util/hooks/useTokenPrice";
import { TokenListInfo } from "@w-info-sst/types";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

type Props = {
  data: any;
};

export default function Chart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 400 }} className="p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data as any}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis
            domain={["dataMin", "dataMax"]}
            type="number"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip />
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
