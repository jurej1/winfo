import { formatDistanceToNowStrict } from "date-fns";

export const getTransactionTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);

  return formatDistanceToNowStrict(date, { addSuffix: true });
};
