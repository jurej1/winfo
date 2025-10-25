export type OHLCDaysFilter = "1" | "7" | "14" | "30" | "90" | "180" | "365";

export type OHLCItem = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
