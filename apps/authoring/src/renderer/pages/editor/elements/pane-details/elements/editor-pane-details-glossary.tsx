import React from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { ActionMenu, ActionMenuItem } from '../../../../../components';

import { glossaryData } from './mock-data';

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
    // action: menuItemAction,
  },
  {
    label: 'Delete Term',
    icon: 'delete',
    iconStyle: 'Outlined',
    // action: menuItemAction,
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

export const TabGlossary = () => {
  const glossaryDict = createGlossaryDict(glossaryData);
  const glossaryItems = createGlossaryItems(glossaryDict);

  return (
    <div className={styles.tabGlossary}>
      <dl className={styles.tabGlossaryList}>{glossaryItems}</dl>
    </div>
  );
};

export default {
  TabGlossary,
};
