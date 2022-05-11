import React from 'react';
import { TabProps, TabsBarProps } from './index.types';
import style from './styles.module.scss';
import { Default as Btn } from '@owlui/button';

export const TabsList = ({ children }: TabsBarProps) => {
  return (
    <ul className={style.tabsList} role="tablist">
      {children}
    </ul>
  );
};

export const TabItem = ({
  title,
  label,
  contentLabel,
  activeTab,
  onClick,
}: TabProps) => {
  const tabIsActive = activeTab === label ? true : false;

  const handleTabClick = () => {
    onClick(label);
  };

  return (
    <>
      <li
        className={`${style.tabsListItem} ${
          tabIsActive ? style.tabsListItemActive : ''
        }`}
        role="presentation"
      >
        <Btn
          id={label}
          role="tab"
          aria-selected={tabIsActive}
          aria-controls={contentLabel}
          onClick={handleTabClick}
          onKeyUp={handleTabClick} // this might be replaced by a proper onKeyUp function to navigate using arrows once the user is in the tablist. WCAG specification.
          tabIndex={tabIsActive ? 0 : -1}
        >
          {title}
        </Btn>
      </li>
    </>
  );
};

export default { TabsList, TabItem };
