import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';
import { PublishDrawer } from './header-publish-drawer';
import { Projects } from '../../../../../models';

export const PublishButton = ({ disabled }: { disabled: boolean }) => {
  const project = Projects.useData();
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleShowDrawer = () => setShowDrawer(!showDrawer);

  return (
    <>
      <Button
        className={`btn btn-sm btn-primary ms-3 ${styles.btnPublish}`}
        onClick={toggleShowDrawer}
        disabled={disabled}
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
      <PublishDrawer
        project={project}
        show={showDrawer}
        onHide={toggleShowDrawer}
      />
    </>
  );
};

export default {
  PublishButton,
};
