type Props = {
  category: string;
};

export function TransactionCategory({ category }: Props) {
  // Map categories to different color schemes
  const getCategoryStyle = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    
    if (lowerCat.includes("send") || lowerCat.includes("transfer")) {
      return "bg-red-100 text-red-700";
    } else if (lowerCat.includes("receive")) {
      return "bg-green-100 text-green-700";
    } else if (lowerCat.includes("swap") || lowerCat.includes("trade")) {
      return "bg-blue-100 text-blue-700";
    } else if (lowerCat.includes("approve")) {
      return "bg-yellow-100 text-yellow-700";
    } else {
      return "bg-slate_gray-DEFAULT/10 text-slate_gray-DEFAULT";
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getCategoryStyle(category)}`}>
      {category}
    </span>
  );
}
