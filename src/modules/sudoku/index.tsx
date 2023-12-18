import React, { memo, useEffect, useState } from 'react';
import { getSudoku } from 'sudoku-gen';
import styles from './styles.module.css'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

type Props = {
  //
};

enum TYPE_ENUM {
  DEFAULT = 'DEFAULT',
  NOT_INPUT = 'NOT_INPUT',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

const SudokuContainer: React.FC<Props> = () => {

  const [difficulty, setDifficulty] = useState<Difficulty[]>(['easy', 'medium', 'hard', 'expert'])
  const [sudoku, setSudoku] = useState({
    puzzle: [''],
    solution: [''],
    difficulty: ''
  })

  const [puzzle, setPuzzle] = useState([{ valid: TYPE_ENUM.DEFAULT, num: '' }])

  const generateSudoku = async (level: Difficulty) => {
    const sudokuGenerate = await getSudoku(level);
    setSudoku({
      puzzle: sudokuGenerate.puzzle.split(/(?<!^)(?!$)/),
      solution: sudokuGenerate.solution.split(/(?<!^)(?!$)/),
      difficulty: sudokuGenerate.difficulty
    })
    const _puzzle = await sudokuGenerate.puzzle.split(/(?<!^)(?!$)/).map((item) => {
      return {
        valid: item === '-' ? TYPE_ENUM.NOT_INPUT : TYPE_ENUM.DEFAULT,
        num: item
      }
    })
    setPuzzle(_puzzle)
  }

  useEffect(() => {
    generateSudoku(difficulty[0])
  }, [])

  const handleCheck = async () => {
    const _puzzle = await puzzle.map((item, index) => {
      return {
        valid: (
          item.valid === TYPE_ENUM.DEFAULT
            ? TYPE_ENUM.DEFAULT
            : item.num === '-' || item.num === ''
              ? TYPE_ENUM.NOT_INPUT
              : item.num === sudoku.solution[index]
                ? TYPE_ENUM.VALID
                : TYPE_ENUM.INVALID
        ),
        num: item.num
      }
    })

    setPuzzle(_puzzle)
  }

  return (
    <>
      <div className={`${styles.main}`}>
        <div className="flex justify-center py-2">
          <span className='text-xs text-white'>Bản quyền thuộc về Phương</span>
        </div>
        <div className="flex justify-center gap-1 py-5">
          {
            difficulty.map((item, index) => (
              <button
                className={`
                px-4 py-2 bg-white capitalize font-bold hover:bg-black hover:text-white border
                ${sudoku.difficulty === item ? '!bg-black !text-white' : ''}
              `}
                onClick={() => generateSudoku(item)}
                key={index}
              >
                {item}
              </button>
            ))
          }
        </div>
        <div className={`${styles.wrapper}`}>
          <ul className={`${styles.playWrap} grid grid-cols-9`}>
            {
              puzzle?.map((item, index) => {
                let _index = index + 1
                let isRight = _index % 3 === 0
                let isBottom = (_index >= 19 && _index <= 27) || _index >= 46 && _index <= 54 || _index >= 73 && _index <= 81
                return (
                  <li
                    className={`
                    ${styles.item}
                    col-span-1
                    ${isRight ? styles.borderRight_2 : ''}
                    ${isBottom ? styles.borderBottom_2 : ''}
                    ${item.valid === TYPE_ENUM.INVALID ? styles.invalid : ''}
                  `}
                    value={_index}
                    key={index}
                  >
                    {
                      puzzle[index].valid === TYPE_ENUM.DEFAULT
                        ? <span className={`${styles.itemDefault}`}>{item.num}</span>
                        : puzzle[index].valid === TYPE_ENUM.VALID
                          ? <span className={`${styles.itemDefault} ${styles.itemValid}`}>{item.num}</span>
                          : <input
                            onChange={(e) => {
                              let _puzzle = puzzle
                              _puzzle[index] = {
                                valid: TYPE_ENUM.NOT_INPUT,
                                num: e.target.value
                              }
                              setPuzzle([..._puzzle])
                            }}
                            defaultValue={item.num === '-' ? '' : item.num}
                            type="text"
                            className={`${styles.inputItem}`}
                          />
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            className={`${styles.checkButton}`}
            onClick={handleCheck}
          >Check</button>
        </div>
      </div>
    </>
  );
};

export default memo(SudokuContainer);
