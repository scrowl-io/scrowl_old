import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import Collapse from 'react-bootstrap/Collapse';
import { Projects } from '../../../../../../models';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  ModuleTreeItem,
  TreeViewModulesProps,
  TreeViewModuleProps,
  LessonTreeItem,
} from './editor-tree-view.types';
import { deepCopy, logEventAction } from './utils';
import { TreeViewLessons } from './editor-tree-view-lessons';

const TreeViewModule = (props: TreeViewModuleProps) => {
  const { tree, project, idx } = props;
  const module: ModuleTreeItem = deepCopy(tree);
  const modules = deepCopy(project.modules);
  const [open, setOpen] = useState(false);
  const itemId = `tree-item-module-${idx}-item`;
  const menuId = `tree-item-module-${idx}-menu`;

  const moduleMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Add Lesson',
      icon: 'widgets',
      iconStyle: 'Outlined',
      action: () => {
        if (!modules) {
          return;
        }

        const newLesson: LessonTreeItem = {
          name: 'Untitled Lesson',
          slides: [
            {
              name: 'Untitled Slide',
            },
          ],
        };

        module.lessons.push(newLesson);
        modules[idx] = module;
        Projects.update({ modules });
      },
    },
    {
      label: 'Rename',
      icon: 'edit',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
    {
      label: 'Duplicate',
      icon: 'content_copy',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
    {
      label: 'Add Module After',
      icon: 'folder',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
    {
      label: 'Move Up',
      icon: 'arrow_upward',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
    {
      label: 'Move Down',
      icon: 'arrow_downward',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
    {
      label: 'Delete Module',
      icon: 'delete',
      iconStyle: 'Outlined',
      action: logEventAction,
    },
  ];

  return (
    <div className={styles.treeViewModule} key={idx}>
      <div className={styles.treeViewHeader}>
        <Button
          id={itemId}
          aria-expanded={open}
          aria-controls={menuId}
          className={styles.treeViewItem}
          onClick={() => setOpen(!open)}
          variant="link"
        >
          <div className="module-icons">
            <span className={styles.treeViewItemIconHandle}>
              <Icon icon="arrow_drop_down" display="Filled" />
            </span>
            <span className={styles.treeViewItemIconDetail}>
              <Icon icon="folder" display={open ? 'Outlined' : 'Filled'} />
            </span>
            <span className={styles.treeViewItemLabel}>{tree.name}</span>
          </div>
        </Button>
        <ActionMenu
          menu-items={moduleMenuItems}
          title="title"
          children={<></>}
        />
      </div>
      <Collapse in={open}>
        <div className="nav flex-column" id={menuId}>
          <TreeViewLessons
            tree={tree.lessons}
            moduleIdx={idx}
            project={project}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const TreeViewModules = (props: TreeViewModulesProps) => {
  const { tree, project } = props;

  return (
    <>
      {tree.map((module, idx) => {
        return (
          <TreeViewModule tree={module} project={project} idx={idx} key={idx} />
        );
      })}
    </>
  );
};

export default {
  TreeViewModules,
};
