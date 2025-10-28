import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function DexConfirmSwapDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full py-7">Review Swap</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Swap</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
