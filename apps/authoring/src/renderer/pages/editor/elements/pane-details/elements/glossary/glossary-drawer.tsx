import React, { useState } from 'react';
import { Drawer } from '@owlui/lib';
import * as styles from '../../editor-pane-details.module.scss';
import { GlossaryDrawerProps } from './glossary-types';
import { GlossaryForm } from './glossary-form';

export const GlossaryDrawer = (props: GlossaryDrawerProps) => {
  const [drawerTermData, setDrawerTermData] = useState({
    name: '',
    description: '',
  });
  const handleOnHide = () => {
    props.onHide(drawerTermData);
  };
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
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
        setDrawerTermData={setDrawerTermData}
      />
    ),
  };

  return (
    <Drawer
      drawer={content}
      className={styles.tabGlossaryOwlOffcanvasForm}
      {...props}
      onHide={handleOnHide}
    />
  );
};

export default {
  GlossaryDrawer,
};
