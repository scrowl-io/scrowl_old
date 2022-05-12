import React from 'react';
import { useLocation } from 'react-router-dom';
import { TitleBarProps } from './index.types';
import * as styles from './styles.module.scss';

export const TitleBar = ({ pages }: TitleBarProps) => {
  const location = useLocation().pathname;
  const title = pages.find(page => page.PageRoute === location);

  return (
    <div className={`${styles.titleBar} drag`} data-testid="toolbar">
      <span className={styles.titleBarTitle}>
        Scrowl{title?.PageName ? ` - ${title.PageName}` : ''}
      </span>
    </div>
  );
};

export default { TitleBar };
