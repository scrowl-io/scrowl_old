import React from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';

export const PreviewButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      className={`btn btn-sm btn-ghost-primary ${styles.btnPreview}`}
      disabled={disabled}
    >
      <Icon icon="play_arrow" />
      Preview
    </Button>
  );
};

export default {
  PreviewButton,
};
