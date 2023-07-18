export type OperationType = "add" | "subtract" | "multiply" | "divide";

export interface Operation {
  type: OperationType;
  symbol: string;
}

export const OPERATIONS: Operation[] = [
  { type: "add", symbol: "+" },
  { type: "subtract", symbol: "-" },
  { type: "multiply", symbol: "×" },
  { type: "divide", symbol: "÷" },
];
