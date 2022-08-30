import React from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';
import { ModalOutline } from '../../components/modal/index';
import { Project } from '../../models';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const projectData = project.useData();

  console.log('projectData', projectData);

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
