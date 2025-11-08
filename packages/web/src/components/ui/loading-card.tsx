import { Spinner } from "./spinner";

type LoadingCardProps = {
  message?: string;
  className?: string;
};

export function LoadingCard({ 
  message = "Loading...", 
  className = "" 
}: LoadingCardProps) {
  return (
    <div className={`flex h-full w-full min-h-[300px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 shadow-sm ${className}`}>
      <Spinner />
      <p className="mt-4 text-sm font-medium text-neutral-600">
        {message}
      </p>
    </div>
  );
}

