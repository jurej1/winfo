type Props = {
  address: string;
};

export function TransactionAddress({ address }: Props) {
  return (
    <code className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-600">
      {address}
    </code>
  );
}
