import React from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  TreeViewSlidesProps,
  TreeViewSlideProps,
} from './editor-tree-view.types';

const TreeViewSlide = (props: TreeViewSlideProps) => {
  const { tree, idx, moduleIdx, lessonIdx, project } = props;
  const itemId = `module-${moduleIdx}-lesson-${lessonIdx}-slide-item-${idx}`;
  const slideMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Rename',
      icon: 'edit',
      iconStyle: 'Outlined',
    },
  ];

  return (
    <div className={styles.treeViewSlide} key={idx}>
      <div className={styles.treeViewHeader}>
        <Button id={itemId} className={styles.treeViewItem} variant="link">
          <span className={styles.treeViewItemIconDetail}>
            <Icon icon="check_box_outline_blank" display="Filled" />
          </span>
          <span className={styles.treeViewItemLabel}>{tree.name}</span>
        </Button>
        <ActionMenu
          menu-items={slideMenuItems}
          title="title"
          children={<></>}
        />
      </div>
    </div>
  );
};

export const TreeViewSlides = (props: TreeViewSlidesProps) => {
  const { tree, moduleIdx, lessonIdx, project } = props;

  return (
    <>
      {tree.map((lesson, idx) => {
        return (
          <TreeViewSlide
            tree={lesson}
            moduleIdx={moduleIdx}
            lessonIdx={lessonIdx}
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
  TreeViewSlides,
};
