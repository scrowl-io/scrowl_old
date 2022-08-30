import React, { useState, useEffect } from 'react';
import { Icon } from '@owlui/lib';
import * as styles from './page-home.module.scss';
import { Logo } from '../../components/logo/comp-logo';
import { Projects } from '../../models';

export const PageElement = () => {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setRecentProjects(results.data.projects);
    });
  }, []);

  const handleNewProject = () => {
    //
  };

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

  return (
    <main className={styles.main}>
      <div className="section-title-wrap">
        <Logo />
        <h1 className="section-title">Scrowl Authoring</h1>
      </div>

      <div className="section-row">
        <div>
          <h2 className="section-title">Start</h2>
          <ul>
            <li>
              <button className="section-link" onClick={handleNewProject}>
                <Icon display="Outlined" icon="library_add" />
                New Project...
              </button>
            </li>
            <li>
              <button className="section-link" onClick={handleOpenProject}>
                <Icon display="Outlined" icon="folder_open" />
                Open...
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="section-title">Getting Started</h2>
          <ul>
            <li>
              <button className="section-link">
                Beginner Tutorial Project...
              </button>
            </li>
          </ul>
        </div>
      </div>

      {recentProjects.length === 0 ? (
        <></>
      ) : (
        <>
          <h2 className="section-title">Recent Projects:</h2>
          <ul>
            {recentProjects.map(
              (project: Projects.ProjectData, index: number) => (
                <button
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              )
            )}
          </ul>
          <button className="section-link">More...</button>
        </>
      )}
    </main>
  );
};

export default {
  PageElement,
};
