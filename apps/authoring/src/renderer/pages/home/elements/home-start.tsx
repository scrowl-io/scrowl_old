import React from 'react';
import { Nav } from 'react-bootstrap';
import { Icon, Button } from '@owlui/lib';
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
    <>
      <h2>Start</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <Button variant="link" onClick={handleNewProject}>
            <Icon display="Outlined" icon="library_add" />
            New Project
          </Button>
        </Nav.Item>
        {hasProjects && (
          <Nav.Item>
            <Button variant="link" onClick={handleOpenProject}>
              <Icon display="Outlined" icon="folder_open" />
              Open...
            </Button>
          </Nav.Item>
        )}
      </Nav>
    </>
  );
};

export default {
  Start,
};
