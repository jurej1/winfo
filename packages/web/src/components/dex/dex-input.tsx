import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type Props = React.ComponentProps<"input"> & {
  onChanged?: (val: string) => void;
  className?: string;
};

export function DexInput({ onChanged, className, ...props }: Props) {
  return (
    <Input
      inputMode="decimal"
      pattern="[0-9.,]*"
      className={cn(
        "border-none font-medium text-black shadow-none focus-visible:border-none focus-visible:ring-0",
        "transition-colors duration-300 ease-in-out",
        className,
      )}
      placeholder="0.0"
      style={{
        fontSize: 28,
      }}
      onChange={(event) => {
        if (onChanged === undefined) return;
        let val = event.target.value;
        val = val.replace(/[^0-9.,]/g, "");
        onChanged(val);
      }}
      {...props}
    />
  );
}
