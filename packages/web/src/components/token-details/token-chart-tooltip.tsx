import { formatCurrency } from "@coingecko/cryptoformat";
import { OHLCDaysFilter, OHLCItem } from "@w-info-sst/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: OHLCItem }>;
  label?: number;
  timeframe: OHLCDaysFilter;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  timeframe,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint: OHLCItem = payload[0].payload;
    const date = new Date(label as number);

    const formattedDate =
      timeframe === "1"
        ? date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            day: "numeric",
            month: "short",
          })
        : date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

    return (
      <div className="bg-background bg-opacity-80 rounded-lg border p-3 shadow-md backdrop-blur-sm">
        <p className="mb-1 text-sm font-bold">{formattedDate}</p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-blue-600">Close:</span>{" "}
          {formatCurrency(dataPoint.close, "$")}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-green-600">High:</span>{" "}
          {formatCurrency(dataPoint.high, "$")}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-red-600">Low:</span>{" "}
          {formatCurrency(dataPoint.low, "$")}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold">Open:</span>{" "}
          {formatCurrency(dataPoint.open, "$")}
        </p>
      </div>
    );
  }

  return null;
};
