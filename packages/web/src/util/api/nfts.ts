import {
  CollectionStats,
  GetContractNftsResponseObject,
  NftCollectionMetadata,
  NftTransactions,
} from "@w-info-sst/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export const fetchContractNFTs = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(`${API}/nfts/contract-nfts?${searchParams}`);

  if (!response.ok) {
    throw new Error("Response was not ok!");
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
    throw new Error("Response was not ok!");
  }

  const body = await response.json();

  return body as NftCollectionMetadata;
};

export const fetchNftCollectionTransfers = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(
    `${API}/nfts/collection-transfers?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error("Response was not OK");
  }

  const body = await response.json();

  return body as NftTransactions;
};

export const fetchNftSalePricesByCollection = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(
    `${API}/nfts/contract-sale-prices?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error("Response was not ok!");
  }

  const body = await response.json();

  return body as CollectionStats[];
};
