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
    },
  );

  const body = await response.json();

  return body as CreateOneInchOrderResponse;
};

export const submitLimitOrder = async (params: SubmitOneInchOrderParams) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/limit-orders/submit`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
