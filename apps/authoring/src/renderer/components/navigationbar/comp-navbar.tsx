import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './comp-navbar.scss';
import { Button, Icon, Nav } from '@owlui/lib';
import logo from './scrowl-logo.svg';
import { VersionDropdown } from '../versionDropdown';
import { PreviewDropdown } from '../previewDropdown';

export const NavigationBar = () => {
  const [projectName, setProjectName] = useState('MyCourseProject');

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setProjectName(e.currentTarget.value);
  };

  return (
    <Nav
      className={`owlui-navbar navbar-expand fixed-top scrowl-navbar`}
      as="nav"
    >
      <Link to="/home" className="owl-logo me-2">
        <img src={logo} alt="Scrowl Logo" />
      </Link>

      <div>
        <ul className="navbar-nav align-items-center">
          <VersionDropdown />
        </ul>
      </div>

      <div className="scrowl-filename">
        <input
          name="filename"
          id="filenameInput"
          className="form-control"
          placeholder="Untitled Project"
          value={projectName}
          onChange={handleChange}
        />
      </div>

      <div className="scrowl-navbar__actions">
        <PreviewDropdown />

        <Button
          variant="primary"
          className="btn btn-primary btn-sm ms-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#publishSettings"
          aria-controls="publishSettings"
        >
          <Icon icon="publish" /> Publish
        </Button>
      </div>
    </Nav>
  );
};

export default {
  NavigationBar,
};
