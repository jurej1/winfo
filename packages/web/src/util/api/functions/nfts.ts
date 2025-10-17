import {
  GetContractNftsResponseObject,
  NftCollectionMetadata,
} from "@w-info-sst/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export const fetchContractNFTs = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(`${API}/nfts/contract-nfts?${searchParams}`);

  if (!response.ok) {
    throw Error("Response was not ok!");
  }

  const body = await response.json();

  return body as GetContractNftsResponseObject;
};

export const fetchNftContractMetadata = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(
    `${API}/nfts/collection-metadata?${searchParams}`,
  );

  if (!response.ok) {
    throw Error("Response was not ok!");
  }

  const body = await response.json();

  return body as NftCollectionMetadata;
};
