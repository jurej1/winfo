"use client";

import { useTokenPrice } from "@/util/api/hooks/useTokenPrice";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

export default function Chart() {
  const { data, error, isLoading, isError } = useTokenPrice("bitcoin");

  if (isLoading) return <div className="p-4">Loading Chart...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  return (
    <div style={{ width: "100%", height: 400 }} className="p-4">
      <h2 className="mb-4 text-xl font-bold">Price Trend (Closing Price)</h2>

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
