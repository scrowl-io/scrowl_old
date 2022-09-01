import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as styles from './header-save-tooltip.module.scss';

export const SaveTooltip = () => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Unsaved Changes</Tooltip>}
      delay={0}
    >
      <div className={styles.iconSaveState}>
        <span className={styles.saveState}>*</span>
      </div>
    </OverlayTrigger>
  );
};

export default {
  SaveTooltip,
};
