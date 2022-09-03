import React from 'react';
import { Icon } from '@owlui/lib';
import { Projects } from '../../../models';

export type StartCommons = {
  hasProjects: boolean;
};

export type StartProps = Partial<StartCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;

export const Start = (props: StartProps) => {
  const hasProjects = props.hasProjects;
  const handleNewProject = () => {
    Projects.create();
  };

  const handleOpenProject = () => {
    Projects.explore();
  };

  return (
    <div>
      <h2 className="section-title">Start</h2>
      <ul>
        <li>
          <button className="section-link" onClick={handleNewProject}>
            <Icon display="Outlined" icon="library_add" />
            New Project...
          </button>
        </li>
        {!hasProjects ? (
          <></>
        ) : (
          <li>
            <button className="section-link" onClick={handleOpenProject}>
              <Icon display="Outlined" icon="folder_open" />
              Open...
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default {
  Start,
};
