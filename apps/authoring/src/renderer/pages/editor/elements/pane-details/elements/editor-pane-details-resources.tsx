import React from 'react';
import { Listgroup, Dropdown, Icon } from '@owlui/lib';
import * as styles from '../editor-pane-details.module.scss';
import { resourceData } from './mock-data';
import { ActionMenu, ActionMenuItem } from '../../../../../components';

const resourcesMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Add Lesson',
    icon: 'widgets',
    iconStyle: 'Outlined',
  },
];

const createItem = (
  item: { name: string; description?: string },
  idx: number
) => {
  const description = item.description ? <p>{item.description}</p> : undefined;
  const header = (
    <div className="d-flex resource-header justify-content-between">
      <div className="d-flex resource-header-left">
        <Icon display="Filled" icon="description" />
        <span className="resource-header-link">{item.name}</span>
      </div>

      <div className="d-flex resource-header-right">
        <div className="resources-dropdown">
          <ActionMenu
            menu-items={resourcesMenuItems}
            title="title"
            children={<></>}
          />
        </div>
      </div>
    </div>
  );

  return {
    id: idx.toString(),
    header,
    description,
  };
};

export const TabResources = () => {
  const list = resourceData.map(createItem);
  const tabStyles = `nav flex-column ${styles.tabResources}`;

  return (
    <>
      <Listgroup className={tabStyles} items={list} />
    </>
  );
};

export default {
  TabResources,
};
