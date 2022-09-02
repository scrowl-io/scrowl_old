import React from 'react';
import { Button, Icon } from '@owlui/lib';
import * as styles from '../editor-header.module.scss';
import { Projects } from '../../../../../models';

export const PreviewButton = ({ disabled }: { disabled: boolean }) => {
  const handlePreviewProject = () => {
    Projects.preview();
  };

  return (
    <Button
      className={`btn btn-sm btn-ghost-primary ${styles.btnPreview}`}
      disabled={disabled}
      onClick={handlePreviewProject}
    >
      <Icon icon="play_arrow" />
      Preview
    </Button>
  );
};

export default {
  PreviewButton,
};
