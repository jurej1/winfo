import TokenDetailsPage from "@/components/pages/token-details-page";
import { fetchAllTokens } from "@/util/api/tokens";

export async function generateStaticParams() {
  const allTokenIds = await fetchAllTokens();

  return allTokenIds.map((token) => ({
    id: token.id,
  }));
}

type TokenPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TokenPage({ params }: TokenPageProps) {
  const { id } = await params;

  return <TokenDetailsPage id={id} />;
}
