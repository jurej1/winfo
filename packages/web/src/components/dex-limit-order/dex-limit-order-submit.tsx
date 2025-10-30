import { Button } from "../ui/button";

export function DexLimitOrderSubmit() {
  return (
    <Button
      className="w-full cursor-pointer py-7 text-lg"
      onClick={() => {
        console.log("EXECUTE");
      }}
    >
      Place Limit Order
    </Button>
  );
}
