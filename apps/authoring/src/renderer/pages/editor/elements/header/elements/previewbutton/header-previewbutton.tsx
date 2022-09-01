import { Button, Icon } from '@owlui/lib';
import React from 'react';
import * as styles from './header-previewbutton.module.scss';

export const PreviewButton = () => {
  return (
    <Button className={`btn btn-sm btn-ghost-primary ${styles.btnPreview}`}>
      <Icon icon="play_arrow" />
      Preview
    </Button>
  );
};

export default {
  PreviewButton,
};
