import React from 'react';
import { NavProps } from './player-nav.types';
import * as styles from './player-nav.module.scss';

export const Nav = ({ config }: NavProps) => {
  return <div className={styles.nav}></div>;
};

export default {
  Nav,
};
