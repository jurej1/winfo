import { TokenResult } from "@w-info-sst/types";
import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Professional fintech color palette
const COLORS = [
  "#06B6D4", // accent-teal-500
  "#10B981", // success-500
  "#F59E0B", // warning-500
  "#8B5CF6", // purple
  "#0EA5E9", // blue
  "#EF4444", // error-500
  "#64748B", // neutral-500
  "#475569", // neutral-600
];

type Props = {
  tokens: TokenResult[];
};

export function PortfolioPie({ tokens }: Props) {
  const pieChartData = useMemo(() => {
    return tokens
      .map((token) => ({
        name: token.symbol,
        value: Number(token.portfolio_percentage.toFixed(2)),
      }))
      .filter((item) => item.value > 0);
  }, [tokens]);

  return (
    <div className="h-full w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-primary-dark-900 text-base font-semibold">
          Portfolio Distribution
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          Token allocation by percentage
        </p>
      </div>

      {/* Chart Container */}
      <div className="rounded-lg bg-neutral-50 p-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              strokeWidth={2}
              stroke="#fff"
            >
              {pieChartData.map((_entry, index) => (
                <Cell
                  key={_entry.name}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity duration-150 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{
                color: "#0F172A",
                fontWeight: "500",
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
