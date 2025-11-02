import { LimitOrderStatus } from "@/util/hooks/limit-order/useLimitOrderExecute";
import { Spinner } from "../ui/spinner";
import { MdCheck, MdError } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { cn } from "@/lib/utils";

type StatusRowStatus = "initial" | "pending" | "success";

type Props = {
  status: LimitOrderStatus;
  open: boolean;
};

export function DexLimitOrderSubmitStatus({ status, open }: Props) {
  function getRowStatus(currentStep: number): StatusRowStatus {
    switch (true) {
      case status < currentStep:
        return "initial";
      case status === currentStep:
        return "pending";
      case status > currentStep && status !== LimitOrderStatus.error:
        return "success";
      default:
        return "initial";
    }
  }

  const steps: [string, number][] = [
    ["Check Allowance & Approve", 1],
    ["Create Limit Order", 2],
    ["Sign Limit Order", 3],
    ["Submit Limit Order", 4],
  ];

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl bg-blue-200/20",
        "transition-all duration-250 ease-in-out",
        {
          "mt-0 max-h-0 p-0 opacity-0": !open,
          "mt-2 p-4": open,
        },
      )}
    >
      {steps.map(([title, stepStatus]) => (
        <StatusRow
          key={title}
          title={title}
          status={getRowStatus(stepStatus)}
        />
      ))}
    </div>
  );
}

const StatusRow = ({
  title,
  status = "initial",
}: {
  title: String;
  status: StatusRowStatus;
}) => {
  const iconClass = "h-[15px] w-[15px] text-blue-400";

  return (
    <div className="flex flex-row items-center gap-1">
      <div className="flex w-5 items-center justify-center">
        {status == "pending" && <Spinner className={iconClass} />}
        {status == "success" && <MdCheck className={iconClass} />}
        {status == "initial" && <GoDotFill className={iconClass} />}
      </div>
      {title}
    </div>
  );
};
