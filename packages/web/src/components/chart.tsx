"use client";

import { useTokenPrice } from "@/util/api/hooks/useTokenPrice";
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
  token: TokenListInfo;
};

export default function Chart({ token }: Props) {
  const { data, error, isLoading, isError } = useTokenPrice(token.id);

  if (isLoading) return <div className="p-4">Loading Chart...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  return (
    <div style={{ width: "100%", height: 400 }} className="p-4">
      <h2 className="mb-4 text-xl font-bold uppercase">{token.symbol}</h2>
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
