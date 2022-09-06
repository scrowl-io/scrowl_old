import React from 'react';
import { Drawer } from '@owlui/lib';
import * as styles from '../../editor-pane-details.module.scss';
import { GlossaryDrawerProps } from './glossary-types';
import { GlossaryForm } from './glossary-form';

export const GlossaryDrawer = (props: GlossaryDrawerProps) => {
  const content = {
    header: {
      content: <h4>Add Glossary Term</h4>,
      bsProps: {
        closeButton: true,
        className: styles.owluiOffcanvasHeader,
      },
    },
    body: (
      <GlossaryForm
        term={props.term}
        onHide={props.onHide}
        onSubmit={props.onSubmit}
      />
    ),
  };

  return (
    <Drawer
      drawer={content}
      className={styles.tabGlossaryOwlOffcanvasForm}
      {...props}
    />
  );
};

export default {
  GlossaryDrawer,
};
