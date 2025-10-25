"use client";

import { useTokensList } from "@/util/hooks/useTokensList";

type Props = {
  id: string;
};

export default function TokenDetailsPage({ id }: Props) {
  return <></>;
  //   const { data, isLoading, isError, error } = useTokensList();

  //   if (isLoading || !data) return <div>Loading data...</div>;
  //   if (isError) return <div>Error: ${error.message}</div>;

  //   const token = data.find((t) => t.id === id);

  //   if (!token) return <div>Token could not be found...</div>;

  //   return (
  //     <div className="p-6">
  //       <div className="grid grid-cols-[400px_1fr] gap-8 max-lg:grid-cols-1">
  //         <div className="min-w-0">
  //           <TokenDetails token={token} />
  //         </div>

  //         <div className="min-w-0">
  //           <Chart token={token} />
  //         </div>
  //       </div>
  //     </div>
  //   );
}
