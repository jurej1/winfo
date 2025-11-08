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

// Color palette matching the net-worth-card theme
const COLORS = [
  "#6c757d", // slate_gray
  "#495057", // outer_space
  "#343a40", // onyx
  "#adb5bd", // french_gray
  "#ced4da", // french_gray lighter
  "#dee2e6", // platinum
  "#212529", // eerie_black
  "#8c959f", // slate_gray-700
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
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-slate_gray-DEFAULT text-lg font-semibold tracking-wider uppercase">
            Portfolio Distribution
          </h3>
          <p className="text-outer_space-DEFAULT mt-1 text-sm">
            Token allocation by percentage
          </p>
        </div>

        {/* Chart Container */}
        <div className="rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
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
                strokeWidth={3}
                stroke="#fff"
              >
                {pieChartData.map((_entry, index) => (
                  <Cell
                    key={_entry.name}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-opacity duration-200 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #dee2e6",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{
                  color: "#343a40",
                  fontWeight: "600",
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
