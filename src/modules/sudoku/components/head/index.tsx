import React, { memo } from 'react';
import styles from './styles.module.css'

type Props = {
  //
};

const HeadSudoku: React.FC<Props> = () => {
  return (
    <>
      <div className={`${styles.wrapper} w-full opacity-10`}>
        <div className={`${styles.content} grid grid-cols-12 spsm:gap-3 gap-x-2 gap-y-1`}>
          <div className={`${styles.headTask} spsm:col-span-3 col-span-6`}>
            <div>
              <p className={`${styles.headTitle}`}>Difficulty</p>
              <p className={`${styles.headContent} font-medium`}>Medium</p>
            </div>
          </div>
          <div className={`${styles.headTask} spsm:col-span-3 col-span-6`}>
            <div>
              <p className={`${styles.headTitle}`}>Mistakes</p>
              <p className={`${styles.headContent} font-medium`}>1/3</p>
            </div>
          </div>
          <div className={`${styles.headTask} spsm:col-span-3 col-span-6`}>
            <div>
              <p className={`${styles.headTitle}`}>Score</p>
              <p className={`${styles.headContent} font-medium`}>3220</p>
            </div>
          </div>
          <div className={`${styles.headTask} spsm:col-span-3 col-span-6`}>
            <div>
              <p className={`${styles.headTitle}`}>Time</p>
              <p className={`${styles.headContent} font-medium`}>08:59</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(HeadSudoku);
