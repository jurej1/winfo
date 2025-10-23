type Props = {
  category: string;
};

export function TransactionCategory({ category }: Props) {
  return (
    <div className="inline-block rounded-sm bg-blue-500 px-1 py-0.5">
      <span className="text-xs font-bold text-white capitalize">
        {category}
      </span>
    </div>
  );
}
