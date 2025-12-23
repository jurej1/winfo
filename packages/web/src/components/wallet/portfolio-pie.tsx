"use client";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

// Professional fintech color palette
const COLORS = [
  "#A855F7", // accent-purple-500
  "#3B82F6", // accent-blue-500
  "#10B981", // success-500
  "#06B6D4", // accent-cyan-500
  "#F59E0B", // warning-500
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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass" className="h-full">
        <CardHeader>
          <CardTitle className="text-base">Portfolio Distribution</CardTitle>
          <CardDescription>Token allocation by percentage</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Chart Container */}
          <div className="glass-subtle rounded-lg p-6">
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
                  stroke="rgba(255,255,255,0.5)"
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
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
