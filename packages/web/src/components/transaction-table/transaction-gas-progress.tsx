import { Divide } from "lucide-react";
import { Tooltip } from "../tooltip";
import { Progress } from "../ui/progress";

type Props = {
  gas: string;
  gasUsed: string;
};

export function TransactionGasProgress({ gas, gasUsed }: Props) {
  const val = (Number(gasUsed) / Number(gas)) * 100;

  return (
    <div className="flex items-center gap-x-2">
      <Tooltip
        tooltip={
          <div className="flex flex-col">
            <span>Used: {gasUsed}</span>
            <span>Max: {gas}</span>
          </div>
        }
      >
        <span className="text-xs text-gray-500">{val.toFixed(1)}%</span>
      </Tooltip>
      <Progress value={val} className="h-1.5 w-15 [&>div]:bg-blue-500" />
    </div>
  );
}
