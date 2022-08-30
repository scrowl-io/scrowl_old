import React, { useState, useEffect } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Projects } from '../../models';

export const PageElement = () => {
  const isProcessing = Projects.useProcessing();
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

  console.log('recentProjects', recentProjects, isProcessing);

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
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>Loading...</div> : ''}</div>
        <h1>Home Page</h1>
        {recentProjects.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
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
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default {
  PageElement,
};
