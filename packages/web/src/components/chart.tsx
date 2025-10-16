"use client";

import { useTokenPrice } from "@/util/api/hooks/useTokenPrice";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis
            domain={["dataMin", "dataMax"]}
            type="number"
            // Formats the Y-axis labels
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip />
          <Legend />
          {/* This is the line that plots the Closing Price */}
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
