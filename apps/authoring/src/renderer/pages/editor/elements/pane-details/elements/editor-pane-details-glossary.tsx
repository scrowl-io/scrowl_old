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
  const [activeTerm, setActiveTerm] = useState({ name: '', description: '' });
  const [activeTermIdx, setActiveTermIdx] = useState(-1);
  const [isGlossaryDrawerOpen, setGlossaryDrawerOpen] = useState(false);

  const handleGlossaryEdit = (idx: number) => {
    setActiveTerm(project.glossary[idx]);
    setActiveTermIdx(idx);
    setGlossaryDrawerOpen(true);
  };

  const handleGlossaryDelete = (idx: number) => {
    console.log('deleting glossary term', idx, project.glossary[idx]);
  };

  const handleGlossaryOpen = () => {
    setActiveTerm({ name: '', description: '' });
    setActiveTermIdx(-1);
    setGlossaryDrawerOpen(true);
  };

  const handleGlossaryDrawerClose = () => {
    setGlossaryDrawerOpen(false);
  };

  const handleGlossaryTermUpdate = (term: GlossaryItem) => {
    if (activeTermIdx === -1) {
      console.log('adding new term', activeTermIdx, term);
    } else {
      console.log('updating term', activeTermIdx, term);
    }
  };

  return (
    <div className={styles.tabGlossary}>
      <GlossaryList
        glossary={glossaryDict}
        onEdit={handleGlossaryEdit}
        onDelete={handleGlossaryDelete}
      />
      <GlossaryAddBtn onClick={handleGlossaryOpen} />
      <GlossaryDrawer
        show={isGlossaryDrawerOpen}
        onHide={handleGlossaryDrawerClose}
        term={activeTerm}
        onSubmit={handleGlossaryTermUpdate}
      />
    </div>
  );
};

export default {
  TabGlossary,
};
