import { shortenAddress } from "@/lib/shorten-address";
import { TokenDB } from "@w-info-sst/db";
import Image from "next/image";

type Props = {
  token: TokenDB;
  onPressed: () => void;
};
export function DexTokenSelectRow({ token, onPressed }: Props) {
  const { address, image, name, symbol } = token;

  return (
    <button
      className="cursor-pointer rounded-xl hover:bg-gray-50"
      onClick={onPressed}
    >
      <li className="flex flex-row gap-3 p-2">
        {image && (
          <Image
            src={image}
            alt={symbol}
            width={30}
            height={30}
            className="object-contain"
          />
        )}
        <div className="flex flex-col items-start">
          <span>{name}</span>
          <div className="flex items-end gap-2">
            <span>{symbol}</span>
            <span className="text-sm text-gray-400">
              {shortenAddress(address)}
            </span>
          </div>
        </div>
      </li>
    </button>
  );
}
