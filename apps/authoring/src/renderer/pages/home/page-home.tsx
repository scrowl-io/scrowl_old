import React from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { LeftPane } from '../../components/leftpane/comp-leftpane';

import { Project } from '../../models';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const isProcessing = project.useProcessing();

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        <div
          className="side-panel"
          style={{
            width: '30%',
            height: '100%',
            minWidth: '30%',
            maxWidth: '100vw',
            resize: 'horizontal',
            overflow: 'auto',
            border: '1px solid darkgrey',
          }}
        >
          <LeftPane />
        </div>
      </main>
    </>
  );
};

export default {
  PageElement,
};
