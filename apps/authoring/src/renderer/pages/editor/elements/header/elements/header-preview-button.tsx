import React from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';

export const PreviewButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      className={`btn-ghost-primary ${styles.btnPreview}`}
      size="sm"
      disabled={disabled}
    >
      <Icon icon="interests" />
      Preview
    </Button>
  );
};

export default {
  PreviewButton,
};
