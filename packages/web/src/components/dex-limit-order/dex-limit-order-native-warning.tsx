import { cn } from "@/lib/utils";
import { GoAlertFill } from "react-icons/go";

type Props = {
  show: boolean;
};

export function DexLimitOrderNativeWarning({ show }: Props) {
  return (
    <div
      className={cn("transition-all duration-200 ease-in-out", {
        "mt-2 opacity-100": show,
        "mt-0 max-h-0 opacity-0": !show,
      })}
      aria-hidden={!show}
    >
      <div className="rounded-lg bg-gray-100 p-2 shadow">
        <div className="flex items-start gap-2 text-yellow-600">
          <GoAlertFill className="mt-1 leading-4" />
          <span>
            Currently, only <b>non-native</b> tokens are supported when creating
            limit orders.
          </span>
        </div>
      </div>
    </div>
  );
}
