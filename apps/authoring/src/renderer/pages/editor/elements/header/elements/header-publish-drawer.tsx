/* eslint-disable import/named */
import React, { useState } from 'react';
import * as styles from '../editor-header.module.scss';
import { Button, Drawer, DrawerDefaultProps, Icon } from '@owlui/lib';
import { PublishDrawerContent } from './header-publish-drawer-content';
import { PublishToaster } from './header-publish-toaster';
import { Projects } from '../../../../../models';

export type PublishDrawerCommons = {
  project: Projects.ProjectData;
};

export type PublishDrawerProps = PublishDrawerCommons &
  Partial<DrawerDefaultProps>;

export const PublishDrawer = (props: PublishDrawerProps) => {
  const [toasterShow, setToasterShow] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const { project, ...localProps } = props;

  const hideToaster = () => {
    setToasterShow(false);
  };

  const handlePublish = () => {
    Projects.publish(project).then(res => {
      let msg = 'Project was successfully published';

      if (res.error) {
        console.error(res);
        msg = 'Project failed to published';
      }

      setToasterMessage(msg);
      setToasterShow(true);
    });
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
            <Icon
              icon="history_edu"
              style={{
                marginRight: '.5rem',
                fontWeight: 'bold',
                fontSize: '1.5em',
                lineHeight: '0.66',
              }}
            />
            Publish
          </Button>
        </div>
      </>
    ),
  };

  return (
    <>
      <Drawer
        drawer={drawerContent}
        {...localProps}
        placement="end"
        id="publishSettings"
        aria-labelledby="publishSettingsLabel"
        aria-hidden="true"
      />
      <PublishToaster
        title="Publisher Result"
        message={toasterMessage}
        show={toasterShow}
        autohide
        delay={3000}
        onClose={hideToaster}
      />
    </>
  );
};

export default {
  PublishDrawer,
};
