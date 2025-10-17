import Chart from "@/components/chart";
import TokensList from "@/components/token-list/tokens-list";

export default function Home() {
  return <TokensList />;

  // return (
  //   <div className="grid grid-cols-[1fr_400px]">
  //     <Chart />
  //     <div>Data</div>
  //   </div>
  // );
}
