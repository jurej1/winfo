import {
  CursorPaginatedResponse,
  LimitOrderApiItem,
} from "@1inch/limit-order-sdk";
import {
  CreateOneInchOrderParams,
  CreateOneInchOrderResponse,
  SubmitOneInchOrderParams,
} from "@w-info-sst/types";

export const createLimitOrder = async (params: CreateOneInchOrderParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/limit-orders/create`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const body = await response.json();

  return body as CreateOneInchOrderResponse;
};

export const submitLimitOrder = async (params: SubmitOneInchOrderParams) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/limit-orders/submit`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchLimitOrdersForWalelt = async (
  chainId: number,
  wallet: string,
) => {
  const searchParams = new URLSearchParams({
    chainId: chainId.toString(),
    wallet: wallet,
  });

  const url = `${process.env.NEXT_PUBLIC_API_URL}/limit-orders?${searchParams}`;

  const response = await fetch(url);

  const body = await response.json();

  return body as CursorPaginatedResponse<LimitOrderApiItem>;
};
