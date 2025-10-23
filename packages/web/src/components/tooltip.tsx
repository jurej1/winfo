type Props = {
  children: React.ReactNode;
  tooltip: React.ReactNode;
};

export function Tooltip({ children, tooltip }: Props) {
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute bottom-full rounded bg-black p-1 text-xs whitespace-nowrap text-white opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
        {tooltip}
      </div>
      {children}
    </div>
  );
}
