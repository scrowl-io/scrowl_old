import React from 'react';
import * as styles from './editor-right-pane-details.module.scss';
import { Button, Icon } from '@owlui/lib';
import { Pane } from '../../../../components';
import { Projects, Templates } from '../../../../models';
import { RightPaneContentForm } from './content/right-pane-content-form';
import { useActiveSlide, useHasActiveSlide } from '../../page-editor-hooks';

export const RightPane = () => {
  const isLoaded = Projects.useLoaded();
  const slideData = useActiveSlide();
  const hasActiveSlide = useHasActiveSlide();
  const handleExploreTemplates = () => {
    Templates.explore();
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (!isLoaded || !hasActiveSlide) {
    return <></>;
  }

  return (
    <Pane className={styles.slideEditor} side="right">
      <div className={styles.slideEditorHeader}>
        <span className={styles.slideEditorHeaderIcon}>
          <Icon icon="dashboard" display="sharp" filled={true} />
        </span>
        <div>
          <div className={styles.slideEditorHeaderTitle}>{slideData.name}</div>
          <Button
            className={styles.slideEditorHeaderAction}
            variant="link"
            onClick={handleExploreTemplates}
            pxScale="sm"
          >
            Change Template
          </Button>
        </div>
      </div>
      <div className={styles.templateOptionsContent}>
        <RightPaneContentForm />
      </div>
    </Pane>
  );
};

export default {
  RightPane,
};
