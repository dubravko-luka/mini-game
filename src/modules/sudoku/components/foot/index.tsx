import React, { memo } from 'react';
import styles from './styles.module.css'
import Svg from '@/components/Svg';

type Props = {
  //
};

const HeadSudoku: React.FC<Props> = () => {
  return (
    <>
      <div className={`${styles.wrapper} w-full`}>
        <div className={`${styles.content} grid grid-cols-12 gap-3`}>
          <div className={`${styles.headTask} col-span-3`}>
            <div>
              <Svg name="undo" class={`${styles.headIcon}`} />
              <p className={`${styles.headContent} font-medium`}>Undo</p>
            </div>
          </div>
          <div className={`${styles.headTask} col-span-3`}>
            <div>
              <Svg name="erase" class={`${styles.headIcon}`} />
              <p className={`${styles.headContent} font-medium`}>Erase</p>
            </div>
          </div>
          <div className={`${styles.headTask} col-span-3`}>
            <div>
              <Svg name="note" class={`${styles.headIcon}`} />
              <p className={`${styles.headContent} font-medium`}>Notes</p>
            </div>
          </div>
          <div className={`${styles.headTask} col-span-3`}>
            <div>
              <Svg name="hint" class={`${styles.headIcon}`} />
              <p className={`${styles.headContent} font-medium`}>Hint</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(HeadSudoku);
