import React from 'react';
import { Icon, Button } from '@owlui/lib';
import { GlossaryAddBtnProps } from './glossary-types';
import * as styles from '../../editor-pane-details.module.scss';

export const GlossaryAddBtn = (props: GlossaryAddBtnProps) => {
  return (
    <div className={styles.owlStickyAddItem}>
      <Button
        className={styles.owlStickyAddItemButton}
        data-bs-toggle="offcanvas"
        data-bs-target="#addGlossaryTerm"
        aria-controls="addGlossaryTerm"
        {...props}
      >
        Add a new term to the glossary...
        <Icon icon="add_circle" />
      </Button>
    </div>
  );
};

export default {
  GlossaryAddBtn,
};
