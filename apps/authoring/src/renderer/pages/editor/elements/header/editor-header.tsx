import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import { Projects } from '../../../../models';
import { Logo, Toolbar } from '../../../../components';
import { PreviewButton, SaveTooltip } from './elements';

export const Header = () => {
  // Once the implementation of the "unsaved" state is defined, this
  // piece of state should be updated in order to display the tooltip
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSavetooltip, setShowSaveTooltip] = useState(false);
  const project = Projects.useData();
  const disableElement = !project.name.trim();

  const handleFilenameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;

    Projects.update({ name });
  };

  return (
    <Toolbar>
      <div className="navbar navbar-expand scrowl__navbar">
        <Logo href="/" sizing="sm" />
        <div className={styles.filename} data-value={project.name}>
          <input
            name="filename"
            id="filenameInput"
            className="owlui-form-control"
            value={project.name}
            placeholder="Untitled Project"
            onChange={handleFilenameChange}
            size={13}
            disabled={disableElement}
          />
        </div>
        <div className={`collapse`}>
          <ul className={`align-items-center me-auto`}>
            {showSavetooltip && (
              <li className="nav-item">
                <SaveTooltip />
              </li>
            )}
          </ul>
        </div>
      </div>
      <ul className="navbar-nav align-items-center">
        <li className="scrowl-navbar__actions">
          <PreviewButton disabled={disableElement} />
          {/* <PublishButton disabled={disableElement} /> Publish button temporarily being disabled */}
        </li>
      </ul>
    </Toolbar>
  );
};

export default {
  Header,
};
