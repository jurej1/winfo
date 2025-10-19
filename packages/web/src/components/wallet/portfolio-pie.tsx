import { TokenResult } from "@w-info-sst/types";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

type Props = {
  tokens: TokenResult[];
};

export function PortfolioPie({ tokens }: Props) {
  const pieChartData = tokens
    .map((token) => ({
      name: token.symbol,
      value: Number(token.portfolio_percentage.toFixed(2)),
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="flex items-center justify-center">
      <PieChart
        width={400}
        height={400}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label
        >
          {pieChartData.map((_entry, index) => (
            <Cell key={_entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
