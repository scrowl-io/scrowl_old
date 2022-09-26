import React from 'react';
import { OutlineTabNavProps } from '../../player-outline.types';
import * as styles from '../../player-outline.module.scss';
import { NavModule } from './elements';

export const TabNav = ({ config }: OutlineTabNavProps) => {
  return (
    <div className={styles.nav}>
      {config.map((def, mIdx: number) => {
        return <NavModule key={mIdx} idx={mIdx} config={def} />;
      })}
    </div>
  );
};

export default {
  TabNav,
};
