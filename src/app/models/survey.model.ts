import { Type, Expose, Exclude } from "class-transformer";

export class Action {
  id: number;
  role: string;
  stepID: number;
  key: string;
  proceed: number;
  log: string;
}
