import React from 'react';
import { GlossaryListEntriesProps, GlossaryListProps } from './glossary-types';
import * as styles from '../../editor-pane-details.module.scss';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';

export const GlossaryListEntries = ({
  glossary,
  onEdit,
  onDelete,
}: GlossaryListEntriesProps) => {
  const entries = Object.keys(glossary).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const getEntryIndex = (ev: React.MouseEvent<Element, MouseEvent>) => {
    const target = ev.target as HTMLElement;

    let actionBtn;

    if (target.nodeName === 'SPAN') {
      actionBtn = target.parentElement?.parentElement?.parentElement
        ?.parentElement as HTMLElement;
    } else {
      actionBtn = target.parentElement?.parentElement
        ?.parentElement as HTMLElement;
    }

    if (!actionBtn || actionBtn.dataset.idx === undefined) {
      return;
    }

    const idx = parseInt(actionBtn.dataset.idx);

    if (isNaN(idx)) {
      return;
    }

    return idx;
  };
  const actionMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Edit',
      icon: 'edit',
      display: 'outlined',
      actionHandler: (ev: React.MouseEvent<Element, MouseEvent>) => {
        const idx = getEntryIndex(ev);

        if (idx === undefined) {
          console.error('unable to edit glossary term: idex not found');
          return;
        }

        onEdit(idx);
      },
    },
    {
      label: 'Delete',
      icon: 'delete',
      display: 'outlined',
      actionHandler: (ev: React.MouseEvent<Element, MouseEvent>) => {
        const idx = getEntryIndex(ev);

        if (idx === undefined) {
          console.error('unable to delete glossary term: idex not found');
          return;
        }

        onDelete(idx);
      },
    },
  ];

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
              <ActionMenu
                data-idx={glossary[entry].idx}
                menu-items={actionMenuItems}
                title="title"
                children={<></>}
              />
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

export const GlossaryList = ({
  glossary,
  onEdit,
  onDelete,
}: GlossaryListProps) => {
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
            <GlossaryListEntries
              glossary={glossary[heading]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        );
      })}
    </>
  );
};

export default {
  GlossaryListEntries,
  GlossaryList,
};
