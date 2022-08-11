import React, { useEffect } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project } from '../../models';
import { requester } from '../../services';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const isProcessing = project.useProcessing();
  const projectData = project.useProjectData();

  console.log(projectData);

  // Example of how to fetch a list of recent projects from the backend. Endpoint "/projects/lists/recent".
  useEffect(() => {
    requester
      .invoke('/projects/list/recent')
      .then(result => console.log(result));
  }, []);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
      </main>
    </>
  );
};

export default {
  PageElement,
};
