import React from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from '../styles/comp-app.module.scss';
import { TitleBarProps } from './comp-app-titlebar.types';

export const Element = ({ routes }: TitleBarProps) => {
  let activeRoute;
  const location = useLocation().pathname;

  if (routes && routes.length) {
    activeRoute = routes.find(page => page.url === location);
  }

  return (
    <div className={`${styles.titleBar} drag`} data-testid="toolbar">
      <span className={styles.titleBarTitle}>
        Scrowl {activeRoute?.label ? ` - ${activeRoute.label}` : ''}
      </span>
    </div>
  );
};

export default {
  Element,
};
