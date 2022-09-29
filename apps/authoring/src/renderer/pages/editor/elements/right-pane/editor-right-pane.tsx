import React from 'react';
import * as styles from './editor-right-pane-details.module.scss';
import { Button, Icon } from '@owlui/lib';
import { Alert } from 'react-bootstrap';
import { Pane } from '../../../../components';
import { Projects, Templates } from '../../../../models';
import { RightPaneContentForm } from './content/right-pane-content-form';
import { useActiveSlide, useHasActiveSlide } from '../../page-editor-hooks';

export const RightPane = () => {
  const isLoaded = Projects.useLoaded();
  const slideData = useActiveSlide();
  const hasActiveSlide = useHasActiveSlide();
  const hasTemplate =
    slideData.template &&
    slideData.template.meta &&
    slideData.template.meta.name;
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
    return (
      <Pane className="slide-editor" side="right">
        <div className={styles.slideEditorHeader}>
          <Alert variant="light" className="w-100">
            <small>Select a slide to edit settings</small>
          </Alert>
        </div>
      </Pane>
    );
  }

  return (
    <Pane className="slide-editor" side="right">
      {hasTemplate && (
        <div className={styles.slideEditorHeader}>
          <span className={styles.slideEditorHeaderIcon}>
            <Icon icon="dashboard" display="sharp" filled={true} opsz={20} />
          </span>
          <div>
            <div className={styles.slideEditorHeaderTitle}>
              {slideData.template.meta.name}
            </div>
            <Button
              className={styles.slideEditorHeaderAction}
              variant="link"
              onClick={handleExploreTemplates}
            >
              Change Template
            </Button>
          </div>
        </div>
      )}
      <div className={styles.templateOptionsContent}>
        <RightPaneContentForm />
      </div>
    </Pane>
  );
};

export default {
  RightPane,
};
