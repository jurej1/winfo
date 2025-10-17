import { GetContractNftsResponseObject } from "@w-info-sst/types";

export const fetchContractNFTs = async (address: string) => {
  const searchParams = new URLSearchParams({
    address,
  }).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/nfts/contract-nfts?${searchParams}`,
  );

  if (!response.ok) {
    throw Error("Response was not ok!");
  }

  const body = await response.json();

  return body as GetContractNftsResponseObject;
};
