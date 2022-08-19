import React from 'react';
import * as styles from './editor-header.module.scss';
import { Logo, Toolbar } from '../../../../components';

export const Header = () => {
  return (
    <Toolbar>
      <Logo />
      <div className={styles.filename} data-value="MyCourseProject">
        <input
          name="filename"
          id="filenameInput"
          className="form-control"
          value="MyCourseProject"
          placeholder="Untitled Project"
        />
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
