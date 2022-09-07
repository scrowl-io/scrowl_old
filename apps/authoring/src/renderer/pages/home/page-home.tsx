import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { Projects } from '../../models';
import { Logo } from '../../components/logo/comp-logo';
import { RecentProjects, Start, Tutorials } from './elements';

// const project = new Project();

// export const PageElement = () => {
//   project.ready();

//   const isProcessing = project.useProcessing();
//   const projectModelData = project.useData();

export const PageElement = () => {
  const [recentProjectList, setRecentProjectList] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);

  useEffect(() => {
    Projects.listRecent().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setRecentProjectList(results.data.projects);

      const hasProjects = results.data.projects.length > 0;
      setHasProjects(hasProjects);
    });
  }, []);

  console.log('projectList', recentProjectList);

  return (
    <main className={styles.main}>
      <div className="section-title-wrap">
        <Logo />
        <h1 className="section-title">Scrowl Authoring</h1>
      </div>

      <div className="section-row">
        <Start hasProjects={hasProjects} />
        <Tutorials />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <RecentProjects
          hasProjects={hasProjects}
          recentProjectList={recentProjectList}
        />
      </div>
    </main>
  );
};

export default {
  PageElement,
};
