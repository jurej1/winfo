"use client";

import { useTokensList } from "@/util/api/hooks/useTokensList";
import TokenListItem from "../components/token-list-item";
import { TokenSearchDialog } from "@/components/token-search-dialog";

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

  return (
    <div className="m-auto flex max-w-7xl flex-col py-2">
      <TokenSearchDialog />
      <ul className="w-full px-2">{listItems}</ul>
    </div>
  );
}
