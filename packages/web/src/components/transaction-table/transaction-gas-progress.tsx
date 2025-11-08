import { Progress } from "../ui/progress";

type Props = {
  gas: string;
  gasUsed: string;
};

export function TransactionGasProgress({ gas, gasUsed }: Props) {
  const val = (Number(gasUsed) / Number(gas)) * 100;

  return (
    <div
      className="group/gas relative flex flex-col gap-1.5"
      title={`Gas Used: ${gasUsed} / ${gas}`}
    >
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 rounded-lg bg-black px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg group-hover/gas:block">
        <div className="flex flex-col gap-1">
          <span>
            <span className="font-semibold">Used:</span> {gasUsed}
          </span>
          <span>
            <span className="font-semibold">Max:</span> {gas}
          </span>
        </div>
        {/* Arrow */}
        <div className="border-t-onyx-DEFAULT absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" />
      </div>

      <span className="text-onyx-DEFAULT cursor-help text-xs font-semibold">
        {val.toFixed(1)}%
      </span>
      <Progress value={val} className="bg-platinum-DEFAULT h-2 w-20" />
    </div>
  );
}
