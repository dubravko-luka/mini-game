import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { SudokuBorderBottom, SudokuBorderRight } from '@/types';
import { TYPE_ENUM } from '@/types/enum';
import { PuzzleInterface, SudokuInterface } from '@/types/interfaces';

type Props = {
  sudoku: SudokuInterface,
  setSudoku: React.Dispatch<React.SetStateAction<SudokuInterface>>,
  _puzzle: PuzzleInterface[],
  _setPuzzle: React.Dispatch<React.SetStateAction<PuzzleInterface[]>>
};

const Play: React.FC<Props> = ({ sudoku, setSudoku, _puzzle, _setPuzzle }) => {

  const [selected, setSelected] = useState(-1);
  const [selectedValue, setSelectedValue] = useState('-')

  const handleInput = async (number: string) => {
    if (
      !isNaN(Number(number)) && (
        _puzzle[selected]?.valid === TYPE_ENUM.INVALID ||
        _puzzle[selected]?.valid === TYPE_ENUM.NOT_INPUT
      ) && selected !== -1
    ) {
      let _pzl: PuzzleInterface[] = _puzzle;

      if (Number(number) === Number(sudoku?.solution[selected])) {
        _pzl[selected].valid = TYPE_ENUM.VALID;
        setSelectedValue(number)
      } else {
        _pzl[selected].valid = TYPE_ENUM.INVALID
      }
      _pzl[selected].num = number.toString()

      let _sudokuPuzzle = sudoku.puzzle;
      _sudokuPuzzle[selected] = number.toString();

      setSudoku({
        ...sudoku,
        puzzle: _sudokuPuzzle
      })
      _setPuzzle([..._pzl])
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      handleInput(event.key)
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected])

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.content}`}>
          <ul className={`${styles.playWrap} grid grid-cols-9`}>
            {
              sudoku.puzzle?.map((item, index) => (
                <li
                  onClick={() => {
                    if (index === selected) {
                      setSelected(-1)
                    } else {
                      setSelected(index)
                    }
                    if (item === "-" || _puzzle[index].valid === TYPE_ENUM.INVALID) {
                      setSelectedValue('-')
                    } else {
                      setSelectedValue(item)
                    }
                  }}
                  className={`
                    ${styles.playItem}
                    ${SudokuBorderRight.indexOf(index + 1) !== -1 ? styles.borderRight : ''}
                    ${SudokuBorderBottom.indexOf(index + 1) !== -1 ? styles.borderBottom : ''}
                    ${selected === index ? styles.selected : ''}
                    ${_puzzle[index].valid === TYPE_ENUM.VALID
                      ? styles.valid
                      : (
                        _puzzle[index].valid === TYPE_ENUM.INVALID
                          ? styles.invalid
                          : ""
                      )
                    }
                    ${selectedValue !== '-' && selectedValue === item &&
                      (
                        _puzzle[index].valid === TYPE_ENUM.VALID ||
                        _puzzle[index].valid === TYPE_ENUM.DEFAULT
                      )
                      ? styles.selectedNumber
                      : ''
                    }
                  `}
                  key={index}
                >
                  {item !== "-" ? item : ''}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <ul className="ssm:grid grid-cols-9 flex flex-wrap gap-2 justify-center">
            {
              new Array(9).fill(null).map((_, index) => (
                <li key={index} className={`${styles.itemSelect} ssm:col-span-1`} onClick={() => handleInput((index + 1).toString())}>{index + 1}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(Play);
