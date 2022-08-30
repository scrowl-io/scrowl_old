import React from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';

export const PageElement = () => {
  return (
    <>
      <main className={styles.editor}>
        <Header
          courseName={projectData?.name}
          courseDesc={projectData?.description}
          courseAut={projectData?.authors}
          publishFunc={project?.publish}
        />

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
