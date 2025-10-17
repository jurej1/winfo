import TokensList from "@/components/token-list/tokens-list";

export default function Home() {
  return (
    <div className="grid grid-cols-[200px_1fr]">
      <div className="flex">This is just a test</div>
      <div className="w-full">
        <TokensList />
      </div>
    </div>
  );
}
