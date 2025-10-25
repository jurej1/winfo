import { OHLCDaysFilter } from "@w-info-sst/types";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type Props = {
  onSelected: (val: OHLCDaysFilter) => void;
  val: OHLCDaysFilter;
};

export function TokenChartTimeframeSelector({ onSelected, val }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={val}
      onValueChange={onSelected}
      variant="outline"
    >
      <ToggleGroupItem value="1">1D</ToggleGroupItem>
      <ToggleGroupItem value="7">7D</ToggleGroupItem>
      <ToggleGroupItem value="14">14D</ToggleGroupItem>
      <ToggleGroupItem value="30">1M</ToggleGroupItem>
      <ToggleGroupItem value="90">3M</ToggleGroupItem>
      <ToggleGroupItem value="180">6M</ToggleGroupItem>
      <ToggleGroupItem value="365"> 12M</ToggleGroupItem>
    </ToggleGroup>
  );
}
