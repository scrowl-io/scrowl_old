import React, { useState } from 'react';
import {
  GlossaryData,
  GlossaryDict,
  GlossaryItem,
  GlossaryList,
  GlossaryAddBtn,
  GlossaryDrawer,
} from './glossary';
import * as styles from '../editor-pane-details.module.scss';
import { Projects } from '../../../../../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCopy = (obj?: any) => {
  if (!obj) {
    return;
  }

  return JSON.parse(JSON.stringify(obj));
};

export const TabGlossary = () => {
  const createGlossaryDict = (terms: GlossaryData) => {
    const dict: GlossaryDict = {};

    terms.forEach((item: GlossaryItem, idx: number) => {
      const heading = item.name.substring(0, 1).toUpperCase();

      if (dict[heading] === undefined) {
        dict[heading] = {};
      }

      dict[heading][item.name] = {
        idx,
        description: item.description,
      };
    });

    return dict;
  };

  const project = Projects.useData();

  const glossaryDict = createGlossaryDict(project.glossary);
  const glossary = deepCopy(project.glossary);
  const [activeTerm, setActiveTerm] = useState({ name: '', description: '' });
  const [activeTermIdx, setActiveTermIdx] = useState(-1);
  const [isGlossaryDrawerOpen, setGlossaryDrawerOpen] = useState(false);

  const handleGlossaryEdit = (idx: number) => {
    if (activeTermIdx !== idx) {
      setActiveTerm(project.glossary[idx]);
      setActiveTermIdx(idx);
    }

    setGlossaryDrawerOpen(true);
  };

  const handleGlossaryAdd = () => {
    if (activeTermIdx !== -1) {
      setActiveTerm({ name: '', description: '' });
      setActiveTermIdx(-1);
    }

    setGlossaryDrawerOpen(true);
  };

  const handleGlossaryDrawerClose = () => {
    setGlossaryDrawerOpen(false);
  };

  const handleGlossaryDelete = (idx: number) => {
    glossary.splice(idx, 1);
    Projects.update({ glossary });
  };

  const handleGlossaryCancel = () => {
    if (activeTermIdx === -1) {
      setActiveTerm({ name: '', description: '' });
    } else {
      setActiveTerm(project.glossary[activeTermIdx]);
    }

    setGlossaryDrawerOpen(false);
  };

  const handleGlossaryUpdate = (term: GlossaryItem) => {
    if (activeTermIdx === -1) {
      // adding new term
      glossary.push(term);
    } else {
      // updating term
      glossary[activeTermIdx] = term;
    }

    setActiveTerm(term);
    Projects.update({ glossary });
    setGlossaryDrawerOpen(false);
  };

  return (
    <div className={styles.tabGlossary}>
      <GlossaryList
        glossary={glossaryDict}
        onEdit={handleGlossaryEdit}
        onDelete={handleGlossaryDelete}
      />
      <GlossaryAddBtn onClick={handleGlossaryAdd} />
      <GlossaryDrawer
        show={isGlossaryDrawerOpen}
        onHide={handleGlossaryDrawerClose}
        term={activeTerm}
        onChange={setActiveTerm}
        onSubmit={handleGlossaryUpdate}
        onCancel={handleGlossaryCancel}
      />
    </div>
  );
};

export default {
  TabGlossary,
};
