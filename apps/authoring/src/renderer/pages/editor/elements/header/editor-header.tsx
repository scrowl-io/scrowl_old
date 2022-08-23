import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import { Logo, Toolbar } from '../../../../components';

export const Header = () => {
  const [filename, setFilename] = useState('MyCourseProject');

  const handleFilenameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setFilename(ev.currentTarget.value);
  };

  return (
    <Toolbar>
      <Logo />
      <div className={styles.filename} data-value={filename}>
        <input
          name="filename"
          id="filenameInput"
          className="form-control"
          value={filename}
          placeholder="Untitled Project"
          onChange={handleFilenameChange}
        />
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
