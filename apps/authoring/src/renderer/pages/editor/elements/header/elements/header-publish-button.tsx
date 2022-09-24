import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';
import { Projects } from '../../../../../models';
import { PublishToaster } from './header-publish-toaster';

export const PublishButton = ({ disabled }: { disabled: boolean }) => {
  const project = Projects.useData();
  const [toasterShow, setToasterShow] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  console.log(project);

  const hideToaster = () => {
    setToasterShow(false);
  };

  const handlePublish = () => {
    Projects.publish(project)
      .then(() => {
        setToasterMessage('Project was successfully published');
        setToasterShow(true);
      })
      .catch(error => {
        console.log(error.message);
        setToasterMessage('Project failed to published');
        setToasterShow(true);
      });
  };

  return (
    <>
      <Button
        className={`btn btn-sm btn-primary ms-3 ${styles.btnPublish}`}
        onClick={handlePublish}
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
  PublishButton,
};
