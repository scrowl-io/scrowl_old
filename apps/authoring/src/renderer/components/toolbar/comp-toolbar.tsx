import React from 'react';
import { ToolbarProps } from './comp-toolbar.types';
import * as styles from './comp-toolbar.module.scss';

export const Toolbar = ({ children }: ToolbarProps) => {
  const toolbarStyles = `navbar navbar-expand fixed-top justify-content-between ${styles.scrowlNavbar}`;

  return <nav className={toolbarStyles}>{children}</nav>;
};

export default {
  Toolbar,
};
