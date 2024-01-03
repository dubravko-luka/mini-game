import { TYPE_ENUM } from "./enum";

export interface PuzzleInterface {
  valid: TYPE_ENUM;
  num: string;
}

export interface SudokuInterface {
  puzzle: string[],
  solution: string[],
  difficulty: string,
}