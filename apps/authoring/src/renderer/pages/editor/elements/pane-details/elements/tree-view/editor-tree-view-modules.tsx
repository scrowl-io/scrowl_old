import React, { useCallback, useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import { AddButton } from '../buttons/add-button';
import Collapse from 'react-bootstrap/Collapse';
import { Projects } from '../../../../../../models';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  ModuleTreeItem,
  TreeViewModulesProps,
  TreeViewModuleProps,
  LessonTreeItem,
} from './editor-tree-view.types';
import { deepCopy } from './utils';
import { TreeViewLessons } from './editor-tree-view-lessons';
import { RenameModal } from '../modals/editor-modal-rename';
import { DeleteModal } from '../modals/editor-modal-delete';

const TreeViewModule = (props: TreeViewModuleProps) => {
  const { tree, project, idx } = props;
  const module: ModuleTreeItem = deepCopy(tree);
  const modules = deepCopy(project.modules);
  const [open, setOpen] = useState(false);
  const itemId = `tree-item-module-${idx}-item`;
  const menuId = `tree-item-module-${idx}-menu`;
  const [showModalRename, setModalRename] = useState(false);
  const toggleModalRename = () => setModalRename(!showModalRename);
  const [showModalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!showModalDelete);

  const addLesson = useCallback(() => {
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
  }, [idx, module, modules]);

  const moduleMenuItems: Array<ActionMenuItem> = [
    {
      // name: 'add_lesson', // TEMP: use for filtering (i.e. can't move module up that's first in list)
      id: 'module-menu-add-lesson',
      label: 'Add Lesson',
      icon: 'interests',
      display: 'outlined',
      filled: true,
      actionHandler: addLesson,
    },
    {
      // name: 'rename_module',
      id: 'module-menu-rename',
      label: 'Rename',
      icon: 'edit',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        toggleModalRename();
      },
    },
    {
      // name: 'duplicate_module',
      id: 'module-menu-duplicate',
      label: 'Duplicate',
      icon: 'content_copy',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        if (!modules) {
          return;
        }

        const newModule: ModuleTreeItem = {
          name: module.name + ' copy',
          lessons: deepCopy(module.lessons),
        };

        modules.splice(idx + 1, 0, newModule);
        Projects.update({ modules });
      },
    },
    {
      // name: 'add_module_after',
      id: 'module-menu-add-module',
      label: 'Add Module After',
      icon: 'folder',
      filled: true,
      display: 'outlined',
      actionHandler: () => {
        const newModule: ModuleTreeItem = {
          name: 'Untitled Module',
          lessons: [
            {
              name: 'Untitled Lesson',
              slides: [{ name: 'Untitled Slide' }],
            },
          ],
        };

        modules.push(newModule);
        Projects.update({ modules });
      },
    },
    {
      // name: 'move_up',
      label: 'Move Up',
      icon: 'arrow_upward',
      display: 'outlined',
      actionHandler: () => {
        if (!modules) {
          return;
        }

        if (modules.length <= 1 || idx <= 0) {
          console.log('Invalid operation');
          return;
        }
        [modules[idx - 1], modules[idx]] = [modules[idx], modules[idx - 1]];
        Projects.update({ modules });
      },
    },
    {
      // name: 'move_down',
      label: 'Move Down',
      icon: 'arrow_downward',
      display: 'outlined',
      actionHandler: () => {
        if (!modules) {
          return;
        }

        if (modules.length <= 1 || modules.length - 1 <= idx) {
          console.log('Invalid operation');
          return;
        }
        [modules[idx], modules[idx + 1]] = [modules[idx + 1], modules[idx]];
        Projects.update({ modules });
      },
    },
    {
      // name: 'delete_module',
      id: 'module-menu-delete-module',
      label: 'Delete Module',
      icon: 'delete',
      filled: true,
      display: 'outlined',
      actionHandler: () => {
        toggleModalDelete();
      },
    },
  ];

  // const filteredMenuItems = (moduleMenuItem: ) => {
  //   switch (moduleMenuItem.name) {
  //     case 'move_up':
  //       return idx > 0;
  //     case 'move_down':
  //       return idx <= modules.length;
  //     default:
  //       return true;
  //   }
  // };

  const handleRename = (name: string) => {
    module.name = name;
    modules[idx] = module;
    Projects.update({ modules });
  };

  const handleDelete = () => {
    modules.splice(idx, 1);
    Projects.update({ modules });
  };

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
              <Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={styles.treeViewItemIconDetail}>
              <Icon icon="folder" display="outlined" filled={!open} />
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
          <AddButton onClick={addLesson} label="Add Lesson" />
        </div>
      </Collapse>
      <RenameModal
        label="Rename Module"
        value={tree.name}
        onSubmit={handleRename}
        show={showModalRename}
        onHide={toggleModalRename}
      />
      <DeleteModal
        title="Delete Module"
        label="Are you sure you want to delete this module?"
        onSubmit={handleDelete}
        show={showModalDelete}
        onHide={toggleModalDelete}
      />
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
