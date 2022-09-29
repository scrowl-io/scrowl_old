import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import { Projects } from '../../../../models';
import { Logo, Toolbar } from '../../../../components';
import { PublishButton, SaveTooltip } from './elements';
import { Navbar, Nav } from 'react-bootstrap';

export const Header = () => {
  // Once the implementation of the "unsaved" state is defined, this
  // piece of state should be updated in order to display the tooltip
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSavetooltip, setShowSaveTooltip] = useState(false);
  const project = Projects.useData();
  const [projectName, setProjectName] = useState(project.name);
  const disableElement = !project.name.trim();

  const handleFilenameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;

    setProjectName(name);
    Projects.update({ name });
  };

  return (
    <Toolbar>
      <Logo href="/" sizing="sm" />
      <div className={styles.filename} data-value={projectName}>
        <input
          name="filename"
          id="filenameInput"
          className="owlui-form-control"
          value={projectName}
          placeholder="Untitled Project"
          onChange={handleFilenameChange}
          size={13}
        />
      </div>
      <Navbar.Collapse>
        <ul className={`align-items-center me-auto`}>
          {showSavetooltip && (
            <li className="nav-item">
              <SaveTooltip />
            </li>
          )}
        </ul>
      </Navbar.Collapse>
      <Nav className="align-items-center me-auto"></Nav>
      <Nav className="align-items-center">
        <Nav.Item className="scrowl-navbar__actions">
          {/* <PreviewButton disabled={disableElement} /> Preview button temporarily being disabled */}
          <PublishButton disabled={disableElement} />
        </Nav.Item>
      </Nav>
    </Toolbar>
  );
};

export default {
  Header,
};
