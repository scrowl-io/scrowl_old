import React from 'react';
import { Listgroup, Dropdown, Icon } from '@owlui/lib';
import * as styles from '../editor-pane-details.module.scss';
import { resourceData } from './mock-data';

const ItemActionBtn = (
  <Icon display="Outlined" icon="more_vert" style={{ fontSize: '15px' }} />
);

const ItemActionMenu = [
  {
    id: '1',
    label: (
      <div className="dropdown-item-wrapper d-flex align-items-center">
        <Icon display="Outlined" icon="edit" />
        <span>Edit</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '2',
    label: (
      <div className="dropdown-item-wrapper d-flex align-items-center">
        <Icon display="Outlined" icon="zoom_in" />
        <span>Preview</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '3',
    label: (
      <div className="dropdown-item-wrapper d-flex align-items-center">
        <Icon display="Outlined" icon="delete" />
        <span>Delete Resource</span>
      </div>
    ),
    value: undefined,
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
        <Dropdown
          title="title"
          align="start"
          items={ItemActionMenu}
          button={ItemActionBtn}
          className="resources-dropdown"
          variant="light"
        >
          <></>
        </Dropdown>
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
