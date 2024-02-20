import React, { memo, useEffect, useState } from 'react';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import Head from './components/head';
import Foot from './components/foot';
import Play from './components/play';
import { TYPE_ENUM } from '@/types/enum';
import { generateSudoku } from '@/helpers/sudoku';
import { SudokuInterface } from '@/types/interfaces';

type Props = {
  //
};

const SudokuContainer: React.FC<Props> = () => {

  const [difficulty, setDifficulty] = useState<Difficulty[]>(['easy', 'medium', 'hard', 'expert']);
  const [puzzle, setPuzzle] = useState([{ valid: TYPE_ENUM.DEFAULT, num: '' }]);
  const [sudoku, setSudoku] = useState<SudokuInterface>({
    puzzle: [''],
    solution: [''],
    difficulty: ''
  });

  const _generateSudoku = async () => {
    const { sudoku, _puzzle } = await generateSudoku(difficulty[2])
    setSudoku(sudoku)
    setPuzzle(_puzzle)
  }

  useEffect(() => {
    _generateSudoku()
  }, [])

  return (
    <>
      <p className="text-center my-3 font-bold text-white text-2xl">Sudoku</p>
      <Head difficulty={difficulty[2]} />
      <Play
        sudoku={sudoku}
        setSudoku={setSudoku}
        _puzzle={puzzle}
        _setPuzzle={setPuzzle}
      />
      <Foot />
    </>
  );
};

export default memo(SudokuContainer);
