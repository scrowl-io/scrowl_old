import React, { useState } from 'react';
import { Listgroup, Icon, DrawerProps, Button, Drawer } from '@owlui/lib';
import * as styles from '../editor-pane-details.module.scss';
import { resourceData } from './mock-data';
import { ActionMenu, ActionMenuItem } from '../../../../../components';
import { ResourceForm } from './forms/resource-form';

const resourcesMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Edit',
    icon: 'edit',
    iconStyle: 'Outlined',
  },
  {
    label: 'Preview',
    icon: 'visibility',
    iconStyle: 'Outlined',
  },
  {
    label: 'Delete Resource',
    icon: 'delete',
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

const AddResourceButton = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const resourceDrawer: DrawerProps = {
    header: {
      content: <h4>Add Resource</h4>,
      bsProps: {
        closeButton: true,
        className: styles.owluiOffcanvasHeader,
      },
    },
    body: <ResourceForm show={toggleDrawer} setShow={setToggleDrawer} />,
  };

  const toggleShow = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <div className={styles.owlStickyAddItem}>
      <Button
        className={styles.owlStickyAddItemButton}
        data-bs-toggle="offcanvas"
        data-bs-target="#addResource"
        aria-controls="addResource"
        onClick={toggleShow}
      >
        Add a new resource to your project... <Icon icon="add_circle" />
      </Button>
      <Drawer
        drawer={resourceDrawer}
        show={toggleDrawer}
        onHide={toggleShow}
        className={styles.tabGlossaryOwlOffcanvasForm}
      />
    </div>
  );
};

export const TabResources = () => {
  const list = resourceData.map(createItem);
  const tabStyles = `nav flex-column ${styles.tabResources}`;

  return (
    <div className={tabStyles}>
      <Listgroup items={list} />
      <AddResourceButton />
    </div>
  );
};

export default {
  TabResources,
};
