import React from 'react';
import * as styles from './editor-right-pane-details.module.scss';
import { Tabs } from '@owlui/lib';
import { Pane } from '../../../../components';
import { Projects } from '../../../../models';
import { RightPaneContentForm } from './content/right-pane-content-form';
import { useActiveSlide } from '../../page-editor-hooks';

export const RightPane = () => {
  const isLoaded = Projects.useLoaded();
  const activeSlide = useActiveSlide();
  const tabItems = [
    {
      id: '1',
      title: 'Content',
      view: (
        <div className={styles.templateOptionsContent}>
          <RightPaneContentForm activeSlide={activeSlide} />
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
      <Tabs items={tabItems} />
    </Pane>
  );
};

export default {
  RightPane,
};
