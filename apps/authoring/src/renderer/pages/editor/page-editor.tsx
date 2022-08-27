import React, { useEffect } from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';
import { Projects } from '../../models';

export const PageElement = () => {
  const isSaveable = Projects.useSave();
  const project = Projects.useData();

  useEffect(() => {
    console.log('updating');
  }, [project, isSaveable]);

  console.log('project', project);

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
