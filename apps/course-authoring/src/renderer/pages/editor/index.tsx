import React, { useState } from 'react';
import { TabsList, TabItem } from '../../components/tabsBar/TabsList';
import {
  TabsContentList,
  TabContentItem,
} from '../../components/tabsBar/TabsContentList';
import style from './styles.module.scss';

export const Route = '/editor';
export const Name = 'Course Editor';

export const Element = () => {
  const initialTabLabel = 'tab-1';
  const [activeTab, setActiveTab] = useState(initialTabLabel);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.tabsContainer}>
      <TabsList>
        <TabItem
          label="tab-1"
          contentLabel="tab-content-1"
          activeTab={activeTab}
          onClick={onClickTabItem}
        />
        <TabItem
          label="tab-2"
          contentLabel="tab-content-2"
          activeTab={activeTab}
          onClick={onClickTabItem}
        />
        <TabItem
          label="tab-3"
          contentLabel="tab-content-3"
          activeTab={activeTab}
          onClick={onClickTabItem}
        />
      </TabsList>
      <TabsContentList>
        <TabContentItem
          label="tab-content-1"
          tabLabel="tab-1"
          activeTab={activeTab}
        >
          <p>{`Content 1`}</p>
        </TabContentItem>
        <TabContentItem
          label="tab-content-2"
          tabLabel="tab-2"
          activeTab={activeTab}
        >
          <p>{`Content 2`}</p>
        </TabContentItem>
        <TabContentItem
          label="tab-content-3"
          tabLabel="tab-3"
          activeTab={activeTab}
        >
          <p>{`Content 3`}</p>
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
