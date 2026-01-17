export const budgetRangeOptions = [
  "lt_50",
  "50_150",
  "150_500",
  "500_2000",
  "2000_plus"
] as const;
export type BudgetRangeOption = (typeof budgetRangeOptions)[number];
