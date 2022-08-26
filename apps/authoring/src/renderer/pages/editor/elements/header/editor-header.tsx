import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import * as toolbarStyles from '../../../../components/toolbar/comp-toolbar.module.scss';
import { Logo, Toolbar } from '../../../../components';
import { PreviewButton } from './elements';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
          size={2}
        />
      </div>
      <div className={`collapse ${toolbarStyles.toolbarCollapse}`}>
        <ul
          className={`${toolbarStyles.toolbarNav} align-items-center me-auto`}
        >
          <li className="nav-item">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Unsaved Changes</Tooltip>}
              delay={0}
            >
              <div
                className="btn btn-save-state"
                role="button"
                aria-pressed="false"
                tabIndex={0}
              >
                <span className="save-state">*</span>
              </div>
            </OverlayTrigger>
          </li>
        </ul>
        <ul className={`${toolbarStyles.toolbarNav} align-items-center`}>
          <li className="scrowl-navbar__actions">
            <PreviewButton />
          </li>
        </ul>
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
