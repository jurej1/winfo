import Image from "next/image";
import { TokenListInfo } from "@w-info-sst/types";
import Link from "next/link";

type Props = {
  token: TokenListInfo;
};

export default function TokenListItem(props: Props) {
  const { token } = props;

  return (
    <Link href={`/token/${token.id}`} key={token.id}>
      <li className="my-2 gap-4 rounded-xl bg-gray-50 p-2 transition-colors duration-300 hover:bg-gray-200">
        <div className="flex gap-x-2">
          <Image
            src={token.image}
            alt={token.name}
            width={20}
            height={20}
            className="object-contain"
          />
          <div className="flex items-baseline gap-x-2">
            <h3 className="text-lg font-bold text-black">{token.name}</h3>
            <h3 className="text-sm text-gray-500 uppercase">{token.symbol}</h3>
          </div>
        </div>
      </li>
    </Link>
  );
}
