import React from 'react';
import { Tabs, Input, InputProps, Button, Listgroup } from '@owlui/lib';
import { Outline, topOutlineItems } from '../accordion';
import { GlossaryCard } from '../card';
import { glossaryCards, resourcesItems } from './leftpane-data';

const AddGlossaryButton = () => {
  return (
    <Button id="add-glossary-button" className="tab-add-button">
      Add a new term to the Glossary...
      <span className="material-symbols-rounded">add_circle</span>
    </Button>
  );
};

const AddResourceButton = () => {
  return (
    <Button id="add-resource-button" className="tab-add-button">
      Add a new resource to your project...
      <span className="material-symbols-rounded">attach_file</span>
    </Button>
  );
};

const tabItems = [
  {
    id: '1',
    title: 'Outline',
    view: <Outline items={topOutlineItems} />,
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

const inputProps: InputProps = {
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
    <>
      <Input inputProps={inputProps} style={{ padding: '1em' }} />
      <Tabs items={tabItems} />
    </>
  );
};

export default {
  LeftPane,
};
