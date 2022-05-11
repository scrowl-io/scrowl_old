import React, { useState } from 'react';
import { TabsList, TabItem } from '../../components/tabsBar/TabsList';
import {
  TabsContentList,
  TabContentItem,
} from '../../components/tabsBar/TabsContentList';
import style from './styles.module.scss';

export const Route = '/editor';
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
          <p>{`Structure`}</p>
        </TabContentItem>
        <TabContentItem
          label="tab-content-build"
          tabLabel="tab-build"
          activeTab={activeTab}
        >
          <p>{`Build`}</p>
        </TabContentItem>
        <TabContentItem
          label="tab-content-export"
          tabLabel="tab-export"
          activeTab={activeTab}
        >
          <p>{`Export`}</p>
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
