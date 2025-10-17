"use client";

import { useTokensList } from "@/util/api/hooks/useTokensList";
import TokenListItem from "./token-list-item";

export default function TokensList() {
  const { data, isLoading, error, isError } = useTokensList();

  if (isLoading) {
    return <div>Loading Token</div>;
  }

  if (isError) {
    return <div>there was an error {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>List is empty.</div>;
  }

  const listItems = data?.map((token) => TokenListItem({ token }));

  return <ul className="px-6 py-2">{listItems}</ul>;
}
