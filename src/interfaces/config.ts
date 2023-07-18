import { Operation, OPERATIONS } from "./operation.ts";

export interface Config {
  operation: Operation;
  boundary: number;
}

export const defaultConfig: Config = {
  operation: OPERATIONS[0],
  boundary: 10,
};
