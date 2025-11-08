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
    <div className={`group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl ${className}`}>
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl animate-pulse" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl animate-pulse" />
      
      <div className="relative z-10 flex h-full min-h-[300px] flex-col items-center justify-center gap-4">
        <div className="rounded-2xl bg-white/60 p-8 backdrop-blur-sm">
          <Spinner />
        </div>
        <p className="text-slate_gray-DEFAULT animate-pulse text-sm font-medium uppercase tracking-wider">
          {message}
        </p>
      </div>
    </div>
  );
}

