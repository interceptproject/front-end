import { Type, Expose, Exclude } from "class-transformer";

export class InfoText {
  order: number;
  paragraphs: string[];
  button: string;
}
