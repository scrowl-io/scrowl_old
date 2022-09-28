import React from 'react';
import { PaneProps } from './comp-pane.types';
import * as styles from './comp-pane.module.scss';

export const Pane = ({ children, className, side }: PaneProps) => {
  let paneStyles = `${styles.pane} `;

  switch (side) {
    case 'right':
      paneStyles += `${styles['pane--right']} `;
      break;
    default:
      paneStyles += `${styles['pane--left']} `;
      break;
  }

  if (className) {
    paneStyles += className;
  }

  return <div className={paneStyles}>{children}</div>;
};

export default {
  Pane,
};
