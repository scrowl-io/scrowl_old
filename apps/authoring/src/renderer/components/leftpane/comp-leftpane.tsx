import React from 'react';
import { Tabs, Input, Button, Listgroup, Icon } from '@owlui/lib';

import { Outline, topOutlineItems } from '../accordion';
import { GlossaryCard } from '../card';
import { glossaryCards, resourcesItems } from './leftpane-data';

import * as styles from './comp-leftpane.module.scss';

const AddGlossaryButton = () => {
  return (
    <Button id="add-glossary-button" className="tab-add-button">
      Add a new term to the Glossary...
      <Icon display="Outlined" icon="add_circle" style={{ fontSize: '2em' }} />
    </Button>
  );
};

const AddResourceButton = () => {
  return (
    <Button id="add-resource-button" className="tab-add-button">
      Add a new resource to your project...
      <Icon display="Outlined" icon="attach_file" style={{ fontSize: '2em' }} />
    </Button>
  );
};

const tabItems = [
  {
    id: '1',
    title: 'Outline',
    view: (
      <>
        <Outline items={topOutlineItems} />
      </>
    ),
  },
  {
    id: '2',
    title: 'Resources',
    view: (
      <>
        <Listgroup className="resources" items={resourcesItems} />
        <div className="panel-footer">
          <AddResourceButton />
        </div>
      </>
    ),
  },
  {
    id: '3',
    title: 'Glossary',
    view: (
      <>
        <GlossaryCard cards={glossaryCards} />
        <div className="panel-footer">
          <AddGlossaryButton />
        </div>
      </>
    ),
  },
];

const inputProps = {
  control: {
    id: 'search',
    type: 'text',
    disabled: false,
    readOnly: false,
    plaintext: false,
    placeholder: 'Search...',
  },
};

export const LeftPane = () => {
  return (
    <div className={styles.leftpane}>
      <Input inputProps={inputProps} style={{ padding: '1em' }} />
      <Tabs items={tabItems} />
    </div>
  );
};

export default {
  LeftPane,
};
