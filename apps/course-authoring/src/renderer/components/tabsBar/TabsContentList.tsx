import React from 'react';
import { TabsContentItemProps, TabsContentListProps } from './index.types';
import style from './styles.module.scss';

export const TabsContentList = ({ children }: TabsContentListProps) => {
  return <div className="tabs-content">{children}</div>;
};

export const TabContentItem = ({
  label,
  tabLabel,
  activeTab,
  children,
}: TabsContentItemProps) => {
  const tabContentRenderer = () => {
    const tabIsActive = activeTab === tabLabel;

    if (tabIsActive) {
      return (
        <div
          className={style.tabsContentItem}
          id={label}
          role="tabpanel"
          aria-labelledby={tabLabel}
          aria-hidden={tabIsActive}
          tabIndex={0}
        >
          {children}
        </div>
      );
    }
  };

  return <>{tabContentRenderer()}</>;
};

export default { TabsContentList, TabContentItem };
