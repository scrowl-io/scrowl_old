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
        className={`btn btn-sm btn-primary ms-2 ${styles.btnPublish}`}
        onClick={toggleShowDrawer}
        disabled={disabled}
      >
        <Icon icon="publish" />
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

// <Portal>
//  <ToastContainer className="p-3" position="bottom-center">
//    <Toast
//      onClose={() => setShowPubToast(false)}
//      show={showPubToast}
//      delay={3000}
//       autohide
//      >
//            <Toast.Header>
//              <strong className="me-auto">Published!</strong>
//            </Toast.Header>
//            <Toast.Body>
//             Course successfuly published into your Downloads folder.
//            </Toast.Body>
//          </Toast>
//        </ToastContainer>
//      </Portal>

export default {
  PublishButton,
};
