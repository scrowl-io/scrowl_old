import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project, ProjectData } from '../../models';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const [recentProjects, setProjectList] = useState([]);
  const isProcessing = project.useProcessing();
  const projectModelData = project.useProjectData();

  useEffect(() => {
    project.list().then(res => {
      if (res.err) {
        console.warn(res);
        return;
      }

      setProjectList(res.data.projects);
    });
  }, []);

  const handleOpenProject = () => {
    console.log('opening project');
  };

  console.log(projectModelData);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        {recentProjects.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
              {recentProjects.map((project: ProjectData, index) => (
                <button key={index} onClick={handleOpenProject}>
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
