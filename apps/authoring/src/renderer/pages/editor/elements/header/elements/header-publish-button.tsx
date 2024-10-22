import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';
import { Projects } from '../../../../../models';
import { PublishToaster } from './header-publish-toaster';

export const PublishButton = ({ disabled }: { disabled: boolean }) => {
  const project = Projects.useData();
  const [toasterShow, setToasterShow] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const hideToaster = () => {
    setToasterShow(false);
  };

  const toast = (msg: string) => {
    setToasterMessage(msg);
    setToasterShow(true);
  };

  const handlePublish = () => {
    Projects.publish(project)
      .then(res => {
        if (res.error) {
          console.error(res);
          toast(res.message);
          return;
        }

        if (res.data.canceled) {
          return;
        }

        toast('Project was successfully published');
      })
      .catch(e => {
        console.log(e);
        toast('Project failed to published: an unexpected error occurred');
      });
  };

  return (
    <>
      <Button
        className={`ms-3 ${styles.btnPublish}`}
        variant="primary"
        size="sm"
        onClick={handlePublish}
        disabled={disabled}
      >
        <Icon icon="history_edu" filled display="sharp" opsz={20} />
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
