type Props = {
  address: string;
};

export function TransactionAddress({ address }: Props) {
  return (
    <code className="text-slate_gray-DEFAULT bg-platinum-200 rounded px-2 py-1 font-mono text-xs">
      {address}
    </code>
  );
}
