import React, { memo } from 'react';
import SudokuContainer from '@/modules/sudoku'

type Props = {
  //
};

const Sudoku: React.FC<Props> = () => {
  return (
    <>
      <SudokuContainer />
    </>
  );
};

export default memo(Sudoku);
