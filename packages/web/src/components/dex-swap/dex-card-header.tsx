import { Spinner } from "../ui/spinner";

type Props = {
  title: string;
  isLoading: boolean;
};

export function DexCardHeader({ title, isLoading }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold">{title}</span>

      {isLoading && <Spinner />}
    </div>
  );
}
