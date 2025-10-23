type Props = {
  address: string;
};

export function TransactionAddress({ address }: Props) {
  return <span className="text-xs">{address}</span>;
}
