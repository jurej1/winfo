export const shortenAddress = (address: string) => {
  const length = address.length;
  return `${address.substring(0, 4)}...${address.substring(length - 4)}`;
};
