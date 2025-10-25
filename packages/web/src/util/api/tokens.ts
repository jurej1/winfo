import { OHLCDaysFilter, OHLCItem, TokenListInfo } from "@w-info-sst/types";

export const fetchTokenOHLC = async (coin: string, days: OHLCDaysFilter) => {
  const searchParams = new URLSearchParams({
    coin,
    days,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens/ohlc?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const rawData = await response.json();

  return rawData.map((d: any) => ({
    date: d[0],
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
  })) as OHLCItem[];
};

export const fetchTokenPrice = async (coin: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens?coin=${coin}`,
  );

  if (!response.ok) {
    throw new Error("Nework response was not ok");
  }

  const rawData = await response.json();

  return rawData;
};

export const fetchTokenList = async (page: number) => {
  const searchParams = new URLSearchParams({ page: page.toString() });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens/list?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const rawData = await response.json();

  return rawData as TokenListInfo[];
};
