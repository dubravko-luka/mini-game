import { TYPE_ENUM } from "@/types/enum";
import { getSudoku } from "sudoku-gen";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

export const generateSudoku = async (level: Difficulty) => {
  const sudokuGenerate = await getSudoku(level);
  const _puzzle = await sudokuGenerate.puzzle.split(/(?<!^)(?!$)/).map((item) => {
    return {
      valid: item === '-' ? TYPE_ENUM.NOT_INPUT : TYPE_ENUM.DEFAULT,
      num: item
    }
  })

  return {
    sudoku: {
      puzzle: sudokuGenerate.puzzle.split(/(?<!^)(?!$)/),
      solution: sudokuGenerate.solution.split(/(?<!^)(?!$)/),
      difficulty: sudokuGenerate.difficulty
    },
    _puzzle
  }
}