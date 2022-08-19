import { Button, Icon } from '@owlui/lib';
import React, { useState } from 'react';
import './comp-preview-dropdown.scss';

export const PreviewDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="btn-group">
      <Button className="btn btn-sm btn-outline-secondary ms-2">
        <Icon icon="desktop_windows" />
        Preview
      </Button>
      <Button
        className={`btn btn-sm btn-outline-secondary ms-2 btn-arrow ${
          showMenu ? 'show' : ''
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon icon="arrow_drop_down" />
      </Button>

      <ul
        className={`dropdown-preview dropdown-menu dropdown-menu-end ${
          showMenu ? 'show' : ''
        }`}
      >
        <li>
          <a className="dropdown-item selected" href="/preview">
            <Icon icon="pages" />
            Current Slide
          </a>
        </li>
        <li>
          <a className="dropdown-item selected" href="/preview">
            <Icon icon="dashboard" />
            Current Lesson
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/preview">
            <Icon icon="folder" />
            Current Module
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="/preview">
            <Icon icon="play_arrow" />
            Entire Course
          </a>
        </li>
      </ul>
    </div>
  );
};

export default {
  PreviewDropdown,
};
