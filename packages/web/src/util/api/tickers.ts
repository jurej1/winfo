export const fetchTokenTickers = async (coin: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens/tickers?coin=${coin}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const rawData = await response.json();
};
