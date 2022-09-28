import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ToolbarProps } from './comp-toolbar.types';
import * as styles from './comp-toolbar.module.scss';

export const Toolbar = ({ children }: ToolbarProps) => {
  const toolbarStyles = `${styles.scrowlNavbar}`;

  return (
    <Navbar fixed="top" expand="xs" className={toolbarStyles}>
      {children}
    </Navbar>
  );
};

export default {
  Toolbar,
};
