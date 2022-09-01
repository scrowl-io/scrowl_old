import { Button, Icon } from '@owlui/lib';
import React from 'react';
import * as styles from './header-publishbutton.module.scss';

export const PublishButton = () => {
  return (
    <Button className={`btn btn-sm btn-primary ms-2 ${styles.btnPublish}`}>
      <Icon icon="publish" />
      Publish
    </Button>
  );
};

export default {
  PublishButton,
};
