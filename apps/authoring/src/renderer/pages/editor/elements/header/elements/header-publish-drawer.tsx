import React from 'react';
import * as styles from '../editor-header.module.scss';
import { Button, Drawer, DrawerDefaultProps, Icon } from '@owlui/lib';
import { PublishDrawerContent } from './header-publish-drawer-content';
import { Projects } from '../../../../../models';

export type PublishDrawerCommons = {
  project: Projects.ProjectData;
};

export type PublishDrawerProps = PublishDrawerCommons &
  Partial<DrawerDefaultProps>;

export const PublishDrawer = (props: PublishDrawerProps) => {
  const { project, ...localProps } = props;
  const handlePublish = () => {
    console.log('publishing');
  };

  const drawerContent = {
    header: {
      content: (
        <h4
          className={`offcanvas-title mb-0 ${styles.publishHeader}`}
          id="publishSettingsLabel"
        >
          Publish
        </h4>
      ),
      bsProps: {
        closeButton: true,
      },
    },
    body: (
      <>
        <PublishDrawerContent project={project} />
        <div className="d-flex justify-content-end my-3">
          <Button
            className={`btn btn-sm btn-success ms-2 ${styles.btnPublish}`}
            onClick={handlePublish}
            disabled={props.disabled}
          >
            <Icon icon="publish" />
            Publish
          </Button>
        </div>
      </>
    ),
  };

  return (
    <Drawer
      drawer={drawerContent}
      {...localProps}
      placement="end"
      id="publishSettings"
      aria-labelledby="publishSettingsLabel"
      aria-hidden="true"
    />
  );
};

export default {
  PublishDrawer,
};
