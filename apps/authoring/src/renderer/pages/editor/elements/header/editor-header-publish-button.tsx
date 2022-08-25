import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import { Icon, Drawer, Button, DrawerProps, Accordion } from '@owlui/lib';
import { PublishDrawerContent } from './editor-header-publish-forms';

export const PublishButton = () => {
  const [showPublishPane, setShowPublishPane] = React.useState(false);
  const [publishData, setPublishData] = useState({
    courseName: '',
    courseDescription: '',
    courseAuthors: '',
    lessonTitle: '',
    lessonStatus: 'Passed/Incomplete',
    LMSID: '',
    outputFormat: 'SCORM 2004',
    outputMedia: 'Recommended',
  });

  const toggleShowPublishPane = () => {
    setShowPublishPane(!showPublishPane);
  };

  const handleSubmitPublish = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(publishData);
  };

  const drawer: DrawerProps = {
    header: {
      content: <h2>Publish</h2>,
      bsProps: {
        closeButton: true,
      },
    },
    body: (
      <>
        <Accordion
          items={PublishDrawerContent(publishData, setPublishData)}
          alwaysOpen
        />
        <Button
          className={styles.publishDrawerButton}
          onClick={handleSubmitPublish}
          variant="success"
        >
          <Icon icon="history" type="Outlined" />
          Publish
        </Button>
      </>
    ),
  };

  return (
    <>
      <Button className={styles.publishButton} onClick={toggleShowPublishPane}>
        <Icon icon="history" type="Outlined" />
        Publish
      </Button>
      <Drawer
        drawer={drawer}
        onHide={toggleShowPublishPane}
        placement="end"
        show={showPublishPane}
        className={styles.publishDrawer}
      />
    </>
  );
};
