import React from 'react';
import { GlossaryListProps } from '../../../player-outline.types';
import * as styles from '../../../player-outline.module.scss';

export const GlossaryListEntries = ({ glossary }: GlossaryListProps) => {
  const entries = Object.keys(glossary).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  return (
    <>
      {entries.map((entry: string, idx: number) => {
        return (
          <div
            className={styles.tabGlossaryTerm}
            key={idx}
            id={`glossary-item-${entry}`}
          >
            <div className="d-flex justify-content-between">
              <dt className={styles.tabGlossaryTermWord}>{entry}</dt>
            </div>
            <dd className={styles.tabGlossaryTermDefinition}>
              {glossary[entry].description}
            </dd>
          </div>
        );
      })}
    </>
  );
};

export const GlossaryList = ({ glossary }: GlossaryListProps) => {
  const headings = Object.keys(glossary).sort();

  if (!headings) {
    return <></>;
  }

  return (
    <>
      {headings.map((heading, idx: number) => {
        return (
          <div key={idx}>
            <header className={styles.tabGlossaryHeader}>{heading}</header>
            <GlossaryListEntries glossary={glossary[heading]} />
          </div>
        );
      })}
    </>
  );
};

export default {
  GlossaryList,
  GlossaryListEntries,
};
