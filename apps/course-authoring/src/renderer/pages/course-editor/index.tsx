import React, { useState } from 'react';
import { Default as Nav } from '@owlui/navigationdrawer';
import { TabsList, TabItem } from '../../components/tabsbar/TabsList';
import {
  TabsContentList,
  TabContentItem,
} from '../../components/tabsbar/TabsContentList';
import style from './styles.module.scss';

export const Route = '/course-editor';
export const Name = 'Course Editor';

const tabs = [
  {
    title: 'Structure',
    label: 'tab-structure',
    contentLabel: 'tab-content-structure',
  },
  {
    title: 'Build',
    label: 'tab-build',
    contentLabel: 'tab-content-build',
  },
  {
    title: 'Export',
    label: 'tab-export',
    contentLabel: 'tab-content-export',
  },
];

export const Element = () => {
  const initialTabLabel = 'tab-structure';
  const [activeTab, setActiveTab] = useState(initialTabLabel);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.tabsContainer}>
      <TabsList>
        {tabs.map(tab => (
          <TabItem
            title={tab.title}
            label={tab.label}
            contentLabel={tab.contentLabel}
            activeTab={activeTab}
            onClick={onClickTabItem}
            key={tab.label}
          />
        ))}
      </TabsList>
      <TabsContentList>
        <TabContentItem
          label="tab-content-structure"
          tabLabel="tab-structure"
          activeTab={activeTab}
        >
          <div className={style.tabContentContainer}>
            <Nav />
            <h2>Structure</h2>
            <Nav />
          </div>
        </TabContentItem>
        <TabContentItem
          label="tab-content-build"
          tabLabel="tab-build"
          activeTab={activeTab}
        >
          <div className={style.tabContentContainer}>
            <Nav />
            <h2>Build</h2>
          </div>
        </TabContentItem>
        <TabContentItem
          label="tab-content-export"
          tabLabel="tab-export"
          activeTab={activeTab}
        >
          <div className={style.tabContentContainer}>
            <h2>Export</h2>
            <Nav />
          </div>
        </TabContentItem>
      </TabsContentList>
    </div>
  );
};

export default {
  Name,
  Route,
  Element,
};
