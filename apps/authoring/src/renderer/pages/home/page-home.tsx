import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { Projects } from '../../models';
import { Logo } from '../../components/logo/comp-logo';
import { RecentProjects, Start } from './elements';
import {
  useHasActiveSlide,
  resetActiveSlide,
} from '../editor/page-editor-hooks';

export const PageElement = () => {
  const hasActiveSlide = useHasActiveSlide();
  const [projectList, setProjectList] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);

  useEffect(() => {
    if (hasActiveSlide) {
      resetActiveSlide();
    }

    Projects.listRecent().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setProjectList(results.data.projects);

      const hasProjects = results.data.projects.length > 0;
      setHasProjects(hasProjects);
    });
  }, [hasActiveSlide]);

  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__header}>
          <h1>
            <Logo />
            Scrowl Authoring
          </h1>
        </div>

        <div className={styles.home__section}>
          <Start hasProjects={hasProjects} />
        </div>

        {/* <div className={styles.home__section}>
          <Tutorials />
        </div> */}

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
