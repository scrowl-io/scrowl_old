import React from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';
import { Project, Template } from '../../models';

const project = new Project();
const template = new Template();

export const PageElement = () => {
  project.ready(); // need to ready the project as the on create event controls the enablement of the template import
  template.ready();

  const projectData = project.useProjectData();
  const templateData = template.useData();

  console.log('projectData', projectData);
  console.log('templateData', templateData);

  return (
    <>
      <main className={styles.editor}>
        <Header />
        <div className={styles.workspace}>
          <PaneDetails />
        </div>
      </main>
    </>
  );
};

export default {
  PageElement,
};
