import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { LeftPane } from '../../components/leftpane/comp-leftpane';
import { Project, ProjectData } from '../../models';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const [recentProjects, setProjectList] = useState([]);
  const isProcessing = project.useProcessing();
  const projectModelData = project.useProjectData();

  useEffect(() => {
    project.list(10).then(res => {
      if (res.err) {
        console.warn(res);
        return;
      }

      setProjectList(res.data.projects);
      console.log('recentProjects', res.data.projects);
    });
  }, []);

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

    project.open(projectId);
  };

  console.log(projectModelData);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <div className="side-panel">
        <LeftPane />
      </div>
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        {recentProjects.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
              {recentProjects.map((project: ProjectData, index) => (
                <button
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              ))}
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
