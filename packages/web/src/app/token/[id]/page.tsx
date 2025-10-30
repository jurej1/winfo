import TokenDetailsPage from "@/components/pages/token-details-page";
import { fetchAllTokens } from "@/util/api/tokens";

export async function generateStaticParams() {
  const allTokenIds = await fetchAllTokens();

  return allTokenIds.map((token) => ({
    id: token.id,
  }));
}

type TokenPageProps = {
  params: {
    id: string;
  };
};

export default function TokenPage({ params }: TokenPageProps) {
  const { id } = params;

  return <TokenDetailsPage id={id} />;
}
