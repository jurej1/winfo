type Props = {
  category: string;
};

export function TransactionCategory({ category }: Props) {
  // Map categories to professional color schemes
  const getCategoryStyle = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    
    if (lowerCat.includes("send") || lowerCat.includes("transfer")) {
      return "bg-error-50 text-error-700";
    } else if (lowerCat.includes("receive")) {
      return "bg-success-50 text-success-700";
    } else if (lowerCat.includes("swap") || lowerCat.includes("trade")) {
      return "bg-accent-purple-50 text-accent-purple-700 dark:bg-accent-purple-950/30 dark:text-accent-purple-400";
    } else if (lowerCat.includes("approve")) {
      return "bg-warning-50 text-warning-700";
    } else {
      return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium capitalize ${getCategoryStyle(category)}`}>
      {category}
    </span>
  );
}
