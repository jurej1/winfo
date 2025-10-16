import Chart from "@/components/chart";

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_400px]">
      <Chart />
      <div>Data</div>
    </div>
  );
}
