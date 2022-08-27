import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import * as toolbarStyles from '../../../../components/toolbar/comp-toolbar.module.scss';
import { Logo, Toolbar } from '../../../../components';
import { PreviewButton } from './elements';
import { SaveTooltip } from './elements/save-tooltip';
import { PublishButton } from './elements/publishbutton';

export const Header = () => {
  const [filename, setFilename] = useState('MyCourseProject');
  // Once the implementation of the "unsaved" state is defined, this
  // piece of state should be updated in order to display the tooltip
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSavetooltip, setShowSaveTooltip] = useState(false);

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
          size={2}
        />
      </div>
      <div className={`collapse ${toolbarStyles.toolbarCollapse}`}>
        <ul
          className={`${toolbarStyles.toolbarNav} align-items-center me-auto`}
        >
          {showSavetooltip && (
            <li className="nav-item">
              <SaveTooltip />
            </li>
          )}
        </ul>
        <ul className={`${toolbarStyles.toolbarNav} align-items-center`}>
          <li className="scrowl-navbar__actions">
            <PreviewButton />
            <PublishButton />
          </li>
        </ul>
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
