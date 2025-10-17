import { FullNftData, NftMetadata } from "@w-info-sst/types";
import Image from "next/image";

type Props = {
  nft: FullNftData;
  onClick: () => void;
};
export function NftCard({ nft, onClick }: Props) {
  const metadata = JSON.parse(nft.metadata) as NftMetadata;

  return (
    <button onClick={onClick}>
      <div className="flex flex-col gap-y-2 rounded-xl border border-gray-200 bg-white text-center shadow-sm transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl">
        <NftImage alt={nft.token_id} src={metadata.image} />

        <div className="flex flex-col items-start gap-x-2 p-3">
          <NftName name={metadata.name} />
          <RankDisplayer label={nft.rarity_label} rank={nft.rarity_rank} />
          <FloorPrice
            currency={nft.floor_price_currency.toUpperCase()}
            price={nft.floor_price}
            usd={nft.floor_price_usd}
          />
        </div>
      </div>
    </button>
  );
}

function NftImage({ src, alt }: { src: string; alt: string }) {
  return <img className="overflow-hidden rounded-xl" src={src} alt={alt} />;
}

function NftName({ name }: { name: string }) {
  return <span className="font-bold">{name}</span>;
}

function RankDisplayer({ rank, label }: { rank: number; label: string }) {
  return (
    <div className="flex w-full content-between justify-between">
      <span>
        <span className="text-gray-400">Rank:</span> {rank}
      </span>
      <div>
        <span>{label}</span>
      </div>
    </div>
  );
}

function FloorPrice({
  price,
  currency,
  usd,
}: {
  price: string;
  currency: string;
  usd: string;
}) {
  return (
    <div>
      <span className="text-gray-400">Floor: </span>
      {price} {currency}
      <span className="text-sm text-gray-400"> ≈ ${usd}</span>
    </div>
  );
}
