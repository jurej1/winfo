import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TransactionValueItem({
  val,
  symbol,
  logo,
  direction,
}: {
  val: string;
  symbol: string;
  logo: string | null;
  direction?: "receive" | "send";
}) {
  const isReceive = direction === "receive";

  const valueColorClass = !direction
    ? ""
    : isReceive
      ? "text-green-500"
      : "text-red-500";

  const DirectionIcon = isReceive ? MdCallReceived : IoIosSend;

  return (
    <div className="flex items-center gap-1 text-sm">
      <span className={cn("font-medium", valueColorClass)}>{val}</span>

      <span className="text-xs font-normal">{symbol}</span>

      {logo && (
        <Image
          src={logo}
          alt="Token Logo"
          width={18}
          height={18}
          className="rounded-full object-contain"
        />
      )}
    </div>
  );
}
