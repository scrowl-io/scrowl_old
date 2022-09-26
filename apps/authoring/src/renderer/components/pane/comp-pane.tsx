import React from 'react';
import { PaneProps } from './comp-pane.types';
import * as styles from './comp-pane.module.scss';

export const Pane = ({ children, className, side }: PaneProps) => {
  let paneStyles = `${styles.pane}`;

  if (className) {
    paneStyles += className;
  }

  switch (side) {
    case 'right':
      paneStyles += ` ${styles.paneRight}`;
      break;
    default:
      paneStyles += ` ${styles.paneLeft}`;
      break;
  }

  return <div className={paneStyles}>{children}</div>;
};

export default {
  Pane,
};
