import Chart from "@/components/chart";
import TokenDetails from "@/components/token-details";
import TokenDetailsPage from "@/components/token-details-page";

type TokenPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TokenPage({ params }: TokenPageProps) {
  const { id } = await params;

  return <TokenDetailsPage id={id} />;
}
