import { cn } from "@/lib/utils";
import { TokenDBwithPrice } from "@w-info-sst/db";
import Image from "next/image";

type Props = {
  tokens: TokenDBwithPrice[];
  show: boolean;
  onSelect: (val: TokenDBwithPrice) => void;
};

const BASE_DELAY_MS = 50;
const STEP_DELAY_MS = 50;

export function DexAdditionalTokensDisplayer({
  tokens,
  show,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-row gap-1">
      {tokens.map((token, index) => {
        const delay = BASE_DELAY_MS + index * STEP_DELAY_MS;
        return (
          <div
            key={token.address}
            className={cn(
              "scale-100 cursor-pointer rounded-full bg-white p-0.5",
              "transition-transform duration-200 ease-in-out hover:scale-120",
              "transition-opacity duration-300 ease-in-out",
              "transition duration-150",
              {
                "translate-y-2 opacity-0": !show,
                "translate-0 opacity-100": show,
              },
            )}
            style={{
              transitionDelay: `${delay}ms`,
            }}
            onClick={() => onSelect(token)}
          >
            <Image
              src={token.logo!}
              alt={token.name}
              height={22}
              width={22}
              className="rounded-full object-fill"
            />
          </div>
        );
      })}
    </div>
  );
}
