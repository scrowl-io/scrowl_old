import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { ActionMenu, ActionMenuItem } from '../../../../../components';

import { glossaryData } from './mock-data';
import { Icon, Drawer, DrawerProps, Button, Modal } from '@owlui/lib';
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

const modalContent = {
  size: 'sm',
  header: {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <h2>Modal Header</h2>,
  },
  body: {
    content: (
      <>
        <h6>Inside the modal body</h6>
        <hr />
        <p>Example of text inside the modal body.</p>
      </>
    ),
  },
  footer: {
    content: (
      <>
        <Button>Save Changes</Button>
      </>
    ),
  },
};

const createGlossaryDict = (data: GlossaryData) => {
  const glossary: GlossaryDict = {};

  data.forEach((item: GlossaryItem) => {
    const firstLetter = item.name.substring(0, 1).toUpperCase();

    if (glossary[firstLetter] === undefined) {
      glossary[firstLetter] = {};
    }

    glossary[firstLetter][item.name] = item.description;
  });

  return glossary;
};

const createGlossaryItems = (
  data: GlossaryDict,
  toggleDrawer: boolean,
  setToggleDrawer: Dispatch<SetStateAction<boolean>>,
  glossary: GlossaryData,
  setGlossary: Dispatch<SetStateAction<any>>
) => {
  const headings = Object.keys(data).sort();

  const glossaryDrawer: DrawerProps = {
    header: {
      content: <h4>Add Glossary Term</h4>,
      bsProps: {
        closeButton: true,
        className: styles.owluiOffcanvasHeader,
      },
    },
    body: (
      <GlossaryForm
        show={toggleDrawer}
        setShow={setToggleDrawer}
        glossaryData={glossaryData}
        glossary={glossary}
        setGlossary={setGlossary}
        editEntry={true}
      />
    ),
  };

  const toggleShow = (e: BaseSyntheticEvent) => {
    console.log(e.target);
    setToggleDrawer(!toggleDrawer);
  };

  return headings.map((heading: string, idxH: number) => {
    const entries = Object.keys(data[heading]).sort();
    const glossaryItemElements = entries.map((entry, idxE) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          className={styles.tabGlossaryTerm}
          key={idxE}
          onClick={toggleShow}
          role="cell"
          id={`glossary-item-${idxE}`}
        >
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

interface AddGlossary {
  glossary: GlossaryData;
  setGlossary: Dispatch<SetStateAction<GlossaryData>>;
  toggleDrawer: boolean;
  setToggleDrawer: Dispatch<SetStateAction<boolean>>;
}

const AddGlossaryTermButton = (props: AddGlossary) => {
  const { toggleDrawer, setToggleDrawer } = props;

  const glossaryDrawer: DrawerProps = {
    header: {
      content: <h4>Add Glossary Term</h4>,
      bsProps: {
        closeButton: true,
        className: styles.owluiOffcanvasHeader,
      },
    },
    body: (
      <GlossaryForm
        show={toggleDrawer}
        setShow={setToggleDrawer}
        glossaryData={glossaryData}
        glossary={props.glossary}
        setGlossary={props.setGlossary}
      />
    ),
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
  const [glossary, setGlossary] = useState([...glossaryData]);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const glossaryDict = createGlossaryDict(glossary);
  const glossaryItems = createGlossaryItems(
    glossaryDict,
    toggleDrawer,
    setToggleDrawer,
    glossary,
    setGlossary
  );

  return (
    <div className={styles.tabGlossary}>
      <dl className={styles.tabGlossaryList}>{glossaryItems}</dl>
      <AddGlossaryTermButton
        glossary={glossary}
        setGlossary={setGlossary}
        toggleDrawer={toggleDrawer}
        setToggleDrawer={setToggleDrawer}
      />
    </div>
  );
};

export default {
  TabGlossary,
};
