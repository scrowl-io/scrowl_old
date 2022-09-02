import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { Logo } from '../../components/logo/comp-logo';
import { Projects } from '../../models';
import { RecentProjects, Start, Tutorials } from './elements';

export const PageElement = () => {
  const [projectList, setProjectList] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);

  useEffect(() => {
    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setProjectList(results.data.projects);
      const hasProjects = results.data.projects.length > 0;
      setHasProjects(hasProjects);
    });
  }, [hasProjects]);

  return (
    <main className={styles.main}>
      <div className={styles.home}>
        <div className={styles.home__header}>
          <h1>
            <Logo />
            Scrowl Authoring
          </h1>
        </div>

        <div className={styles.home__section}>
          <Start hasProjects={hasProjects} />
        </div>

        <div className={styles.home__section}>
          <Tutorials />
        </div>

        <div className={styles.home__section}>
          <RecentProjects hasProjects={hasProjects} projectList={projectList} />
        </div>
      </div>
    </main>
  );
};

export default {
  PageElement,
};
