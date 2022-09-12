/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Button } from '@owlui/lib';
import { Projects } from '../../../models';

export type RecentProjectsCommons = {
  hasProjects: boolean;
  projectList: Array<Projects.ProjectData>;
};

export type RecentProjectsProps = Partial<RecentProjectsCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;

export const RecentProjects = (props: RecentProjectsProps) => {
  const hasProjects = props.hasProjects || false;
  const projectList = props.projectList || [];

  const handleOpenProject = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const projectBtn = ev.currentTarget;

    if (!projectBtn.dataset.projectId) {
      console.error(`Unable to open project: project id required`);
      return;
    }

    const projectId = parseInt(projectBtn.dataset.projectId);

    if (isNaN(projectId)) {
      console.error(
        `Unable to open project: malformed id - ${projectBtn.dataset.projectId}`
      );
      return;
    }

    Projects.open(projectId);
  };
  const handleMoreProjects = (ev: React.MouseEvent<HTMLButtonElement>) => {
    Projects.explore();
  };

  return (
    <>
      {hasProjects && (
        <>
          <h2>Recent</h2>
          <Nav className="flex-column">
            {projectList.map((project: Projects.ProjectData, index: number) => (
              <Nav.Item key={index}>
                <Button
                  variant="link"
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </Button>
              </Nav.Item>
            ))}
            <Nav.Item>
              <Button variant="link" onClick={handleMoreProjects}>
                More...
              </Button>
            </Nav.Item>
          </Nav>
        </>
      )}
    </>
  );
};

export default {
  RecentProjects,
};
