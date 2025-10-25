import { TokenListInfo } from "@w-info-sst/types";

export const fetchTokenOHLC = async (coin: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens/ohlc?coin=${coin}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const rawData = await response.json();

  return rawData.map((d: any) => ({
    date: new Date(d[0]).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
  })) as {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
  };
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
