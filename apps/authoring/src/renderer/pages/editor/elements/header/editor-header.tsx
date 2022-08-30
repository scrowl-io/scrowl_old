import React from 'react';
import * as styles from './editor-header.module.scss';
import { Projects } from '../../../../models';
import { Logo, Toolbar } from '../../../../components';

export const Header = () => {
  const project = Projects.useData();

  const handleFilenameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;

    Projects.update({ name });
  };

  return (
    <Toolbar>
      <Logo />
      <div className={styles.filename} data-value={project.name}>
        <input
          name="filename"
          id="filenameInput"
          className="form-control"
          value={project.name}
          placeholder=""
          onChange={handleFilenameChange}
        />
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
