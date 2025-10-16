export const fetchTokenMarketData = async (coin: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens?coin=${coin}`,
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
