import React from 'react';
import * as styles from './page-home.module.scss';
import { Logo } from '../../components/logo/comp-logo';
import { Projects } from '../../models';
import { RecentProjects, Start, Tutorials } from './elements';

export const PageElement = () => {
  const isProcessing = Projects.useProcessing();

  return (
    <main className={styles.main}>
      <div className="section-title-wrap">
        <Logo />
        <h1 className="section-title">Scrowl Authoring</h1>
      </div>

      <div className="section-row">
        <Start />
        <Tutorials />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <RecentProjects />
      </div>
    </main>
  );
};

export default {
  PageElement,
};
