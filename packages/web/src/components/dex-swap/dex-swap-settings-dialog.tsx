import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaGear } from "react-icons/fa6";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

type Props = {
  slippage: number;
  onSlippageChanged: (val: number) => void;
};

export function DexSwapSettingsDialog({ slippage, onSlippageChanged }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <FaGear />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Swap Settings</DialogTitle>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p>Slippage</p>
              <p>{slippage.toFixed(0)}%</p>
            </div>
            <div className="flex gap-4">
              <Slider
                max={100}
                onValueChange={(val) => {
                  onSlippageChanged(val[0]);
                }}
              />
              <Button onClick={() => onSlippageChanged(1)}>Default</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
