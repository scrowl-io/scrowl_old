import React from 'react';
import { Tabs } from '@owlui/lib';
import { Pane } from '../../../../components';
import { TabOutline, TabGlossary, TabResources } from './elements';
import { Projects } from '../../../../models';

export const PaneDetails = () => {
  const isLoaded = Projects.useLoaded();
  const tabItems = [
    {
      id: '1',
      title: 'Outline',
      view: <TabOutline />,
    },
    {
      id: '2',
      title: 'Resources',
      view: <TabResources />,
    },
    {
      id: '3',
      title: 'Glossary',
      view: <TabGlossary />,
    },
  ];

  if (!isLoaded) {
    return <Pane></Pane>;
  }

  return (
    <Pane>
      <Tabs items={tabItems} size="Sm" />
    </Pane>
  );
};

export default {
  PaneDetails,
};
