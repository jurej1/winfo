"use client";

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
import { motion, AnimatePresence } from "framer-motion";
import { scaleUp } from "@/lib/animations";

type Props = {
  slippage: number;
  onSlippageChanged: (val: number) => void;
};

export function DexSwapSettingsDialog({ slippage, onSlippageChanged }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-accent-purple-50 dark:hover:bg-accent-purple-950/30">
        <FaGear className="h-4 w-4 text-muted-foreground transition-colors hover:text-accent-purple-500" />
      </DialogTrigger>
      <DialogContent className="glass-strong">
        <motion.div
          variants={scaleUp}
          initial="hidden"
          animate="visible"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Swap Settings</DialogTitle>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Slippage</p>
                <p className="font-medium">{slippage.toFixed(0)}%</p>
              </div>
              <div className="flex gap-4">
                <Slider
                  defaultValue={[slippage]}
                  value={[slippage]}
                  max={100}
                  onValueChange={(val) => {
                    onSlippageChanged(val[0]);
                  }}
                />
                <Button variant="outline" onClick={() => onSlippageChanged(1)}>Default</Button>
              </div>
            </div>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
