import React from 'react';
import * as styles from './editor-pane-details.module.scss';
import { Tabs } from '@owlui/lib';
import { Pane } from '../../../../components';
import { TabOutline, TabGlossary, TabResources } from './elements';

export const PaneDetails = () => {
  const tabItems = [
    {
      id: '1',
      title: 'Outline',
      view: TabOutline(),
    },
    {
      id: '2',
      title: 'Resouces',
      view: TabResources(),
    },
    {
      id: '3',
      title: 'Glossary',
      view: TabGlossary(),
    },
  ];

  return (
    <Pane>
      <Tabs items={tabItems} className={styles.paneDetailsTabs} size="Sm" />
    </Pane>
  );
};

export default {
  PaneDetails,
};
