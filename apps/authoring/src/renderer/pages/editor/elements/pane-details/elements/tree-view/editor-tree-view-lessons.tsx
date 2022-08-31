import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import Collapse from 'react-bootstrap/Collapse';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  TreeViewLessonsProps,
  TreeViewLessonProps,
} from './editor-tree-view.types';
import { TreeViewSlides } from './editor-tree-view-slides';

const TreeViewLesson = (props: TreeViewLessonProps) => {
  const { tree, idx, moduleIdx, project } = props;
  const [open, setOpen] = useState(false);
  const itemId = `module-${moduleIdx}-lesson-item-${idx}`;
  const menuId = `module-${moduleIdx}-lesson-menu-${idx}`;

  const lessonMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Add Slide',
      icon: 'crop_square',
      iconStyle: 'Outlined',
    },
  ];

  return (
    <div className={styles.treeViewLesson} key={idx}>
      <div className={styles.treeViewHeader}>
        <Button
          id={itemId}
          aria-expanded={open}
          aria-controls={menuId}
          className={styles.treeViewItem}
          onClick={() => setOpen(!open)}
          variant="link"
        >
          <div className="lesson-icons">
            <span className={styles.treeViewItemIconHandle}>
              <Icon icon="arrow_drop_down" display="Filled" />
            </span>
            <span className={styles.treeViewItemIconDetail}>
              <Icon icon="widgets" display={open ? 'Outlined' : 'Filled'} />
            </span>
            <span className={styles.treeViewItemLabel}>{tree.name}</span>
          </div>
        </Button>
        <ActionMenu
          menu-items={lessonMenuItems}
          title="title"
          children={<></>}
        />
      </div>
      <Collapse in={open}>
        <div className="nav flex-column" id={menuId}>
          <TreeViewSlides
            tree={tree.slides}
            moduleIdx={moduleIdx}
            lessonIdx={idx}
            project={project}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const TreeViewLessons = (props: TreeViewLessonsProps) => {
  const { tree, moduleIdx, project } = props;

  return (
    <>
      {tree.map((lesson, idx) => {
        return (
          <TreeViewLesson
            tree={lesson}
            moduleIdx={moduleIdx}
            idx={idx}
            key={idx}
            project={project}
          />
        );
      })}
    </>
  );
};

export default {
  TreeViewLessons,
};
