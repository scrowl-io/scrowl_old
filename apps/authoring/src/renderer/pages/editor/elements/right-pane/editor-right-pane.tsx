import React from 'react';
import * as styles from './editor-right-pane-details.module.scss';
import { Tabs } from '@owlui/lib';
import { Pane } from '../../../../components';
// import { TabOutline, TabGlossary, TabResources } from './elements';
import { Projects } from '../../../../models';
import { RightPaneContentForm } from './content/right-pane-content-form';

export const RightPane = () => {
  const isLoaded = Projects.useLoaded();
  const tabItems = [
    {
      id: '1',
      title: 'Content',
      view: (
        <div className={styles.templateOptionsContent}>
          <RightPaneContentForm />
        </div>
      ),
    },
    {
      id: '2',
      title: 'Template Options',
      view: (
        <div className={styles.templateOptionsContent}>
          <p>This template does not have additional options.</p>
        </div>
      ),
    },
  ];

  if (!isLoaded) {
    return <Pane></Pane>;
  }

  return (
    <Pane>
      <Tabs items={tabItems} size="Sm" />
    </Pane>
  );
};

export default {
  RightPane,
};
