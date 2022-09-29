import React from 'react';
import { GlossaryList } from './elements';
import {
  GlossaryListProps,
  GlossaryItem,
  GlossaryData,
  GlossaryDict,
} from '../../player-outline.types';

export const TabGlossary = ({ glossary }: GlossaryListProps) => {
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

  const glossaryDict = createGlossaryDict(glossary);

  return <GlossaryList glossary={glossaryDict} />;
};

export default {
  TabGlossary,
};
