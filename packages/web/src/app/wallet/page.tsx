"use client";

import { useWalletBalance } from "@/util/api/hooks/useWalletBalance";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useAccount } from "wagmi";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Define a list of colors for the pie chart slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function Page() {
  const { address } = useAccount();

  const { data, isLoading, error, isError } = useWalletBalance();

  // 1. Prepare data for the PieChart
  const pieChartData = data?.result
    .map((token) => ({
      name: token.symbol,
      value: token.portfolio_percentage,
    }))
    // Optional: Filter out tokens with 0% portfolio to clean up the chart
    .filter((item) => item.value > 0);

  const copyToCLipboard = async () => {
    await navigator.clipboard.writeText(address ?? "");
    toast.success("Copied to clipboard");
  };

  if (!address) return <div>Please connect your wallet...</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="m-auto flex max-w-7xl p-2">
      <div className="flex w-full flex-col gap-y-2 rounded-xl bg-white p-4 shadow">
        <h1 className="e font-bold underline">Wallet Address: </h1>
        <div className="flex items-center gap-x-4">
          <h1>{address}</h1>
          <Button onClick={copyToCLipboard}>Copy</Button>
        </div>

        <hr className="my-4" />

        {data && (
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {data.result.map((token) => (
              <li key={token.token_address} className="flex flex-col">
                <div className="mb-2 flex gap-x-2 font-bold">
                  {token.logo && (
                    <img
                      src={token.logo}
                      alt={token.name}
                      height={20}
                      width={20}
                      className="object-contain"
                    />
                  )}
                  <div>
                    {token.name} ({token.symbol})
                  </div>
                </div>
                <span>Balance: {token.balance_formatted}</span>
                <span>Value (Usd): {token.usd_value}</span>
                <span>Change (24h): {token.usd_price_24hr_usd_change}</span>
                <span>Portfolio Percentage: {token.portfolio_percentage}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Separator for clarity */}
        <hr className="my-4" />

        <div className="flex justify-center">
          <PieChart
            width={400} // Set explicit width
            height={400} // Set explicit height
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              innerRadius={60} // Added innerRadius for a donut-like chart
              outerRadius={150} // Set a fixed outerRadius
              paddingAngle={5} // Adds small gaps between slices
              fill="#8884d8" // This fill is overridden by Cell colors
              dataKey="value"
              nameKey="name"
              label // Add a label prop to show the name/value on the chart
            >
              {pieChartData!.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
}
