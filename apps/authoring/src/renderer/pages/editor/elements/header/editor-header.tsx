import React, { useEffect, useState } from 'react';
import * as styles from './editor-header.module.scss';
import * as toolbarStyles from '../../../../components/toolbar/comp-toolbar.module.scss';
import { Logo, Toolbar } from '../../../../components';
import { PreviewButton } from './elements';
import { SaveTooltip } from './elements/save-tooltip';
import { PublishButton } from './elements/publishbutton';
import { HeaderProps } from './elements/editor-header-types';

export const Header = ({
  courseName,
  courseDesc,
  courseAut,
  publishFunc,
}: HeaderProps) => {
  const [filename, setFilename] = useState(courseName);
  // Once the implementation of the "unsaved" state is defined, this
  // piece of state should be updated in order to display the tooltip
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSavetooltip, setShowSaveTooltip] = useState(false);
  const disableElement = !filename ? true : false;

  useEffect(() => {
    setFilename(courseName);
  }, [courseName]);

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
          placeholder="Untitled Project"
          value={filename || ''}
          onChange={handleFilenameChange}
          size={13}
          disabled={disableElement}
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
            <PreviewButton disabled={disableElement} />
            <PublishButton
              courseName={courseName}
              courseDesc={courseDesc}
              courseAut={courseAut}
              publishFunc={publishFunc}
              disabled={disableElement}
            />
          </li>
        </ul>
      </div>
    </Toolbar>
  );
};

export default {
  Header,
};
