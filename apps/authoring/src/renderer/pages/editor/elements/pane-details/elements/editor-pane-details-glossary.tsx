import React, { useState } from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { ActionMenu, ActionMenuItem } from '../../../../../components';
import { Projects } from '../../../../../models';
import { Icon, Drawer, DrawerProps, Button } from '@owlui/lib';
import { GlossaryForm } from './forms/glossary-form';

export type GlossaryItem = { name: string; description: string };
export type GlossaryData = Array<GlossaryItem>;
export type GlossaryDict = {
  [key: string]: {
    [key: string]: string;
  };
};

const glossaryTermMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Edit',
    icon: 'edit',
    iconStyle: 'Outlined',
  },
  {
    label: 'Delete Term',
    icon: 'delete',
    iconStyle: 'Outlined',
  },
];

const createGlossaryDict = (data: GlossaryData) => {
  const glossary: GlossaryDict = {};

  data.forEach((item: GlossaryItem) => {
    const firstLetter = item.name.substring(0, 1);

    if (glossary[firstLetter] === undefined) {
      glossary[firstLetter] = {};
    }

    glossary[firstLetter][item.name] = item.description;
  });

  return glossary;
};

const createGlossaryItems = (data: GlossaryDict) => {
  const headings = Object.keys(data).sort();

  return headings.map((heading: string, idxH: number) => {
    const entries = Object.keys(data[heading]).sort();
    const glossaryItemElements = entries.map((entry, idxE) => {
      return (
        <div className={styles.tabGlossaryTerm} key={idxE}>
          <div className="d-flex justify-content-between">
            <dt className={styles.tabGlossaryTermWord}>{entry}</dt>
            <ActionMenu
              menu-items={glossaryTermMenuItems}
              title="title"
              children={<></>}
            />
          </div>
          <dd className={styles.tabGlossaryTermDefinition}>
            {data[heading][entry]}
          </dd>
        </div>
      );
    });
    return (
      <div key={idxH}>
        <header>{heading}</header>
        {glossaryItemElements}
      </div>
    );
  });
};

const AddGlossaryTermButton = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const glossaryDrawer: DrawerProps = {
    header: {
      content: <h4>Add Glossary Term</h4>,
      bsProps: {
        closeButton: true,
        className: styles.owluiOffcanvasHeader,
      },
    },
    body: <GlossaryForm show={toggleDrawer} setShow={setToggleDrawer} />,
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
        Add a new term to the glossary... <Icon icon="add_circle" />
      </Button>
      <Drawer
        drawer={glossaryDrawer}
        show={toggleDrawer}
        onHide={toggleShow}
        className={styles.tabGlossaryOwlOffcanvasForm}
      />
    </div>
  );
};

export const TabGlossary = () => {
  const project = Projects.useData();
  const glossaryDict = createGlossaryDict(project.glossary);
  const glossaryItems = createGlossaryItems(glossaryDict);

  return (
    <div className={styles.tabGlossary}>
      <dl className={styles.tabGlossaryList}>{glossaryItems}</dl>
      <AddGlossaryTermButton />
    </div>
  );
};

export default {
  TabGlossary,
};
