import { TokenListInfo } from "@w-info-sst/types";
import { useTokensList } from "./useTokensList";

export const useToken = (id: string) => {
  const { data } = useTokensList();

  let token: TokenListInfo | undefined;

  if (data) {
    token = data.find((t) => t.id === id);
  }

  return {
    token,
  };
};
