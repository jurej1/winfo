import TokenDetails from "@/components/token-details";

type TokenPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TokenPage({ params }: TokenPageProps) {
  const { id } = await params;

  return (
    <div className="px-4">
      <div className="flex max-w-md">
        <TokenDetails id={id} />
      </div>
    </div>
  );
}
