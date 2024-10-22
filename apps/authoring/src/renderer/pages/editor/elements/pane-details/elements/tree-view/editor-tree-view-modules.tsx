import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import { AddButton } from '../buttons/add-button';
import Collapse from 'react-bootstrap/Collapse';
import { Projects, Templates } from '../../../../../../models';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  ModuleTreeItem,
  TreeViewModulesProps,
  TreeViewModuleProps,
  LessonTreeItem,
} from './editor-tree-view.types';
import { deepCopy, moveTreeItem } from './utils';
import { TreeViewLessons } from './editor-tree-view-lessons';
import { RenameModal } from '../modals/editor-modal-rename';
import { DeleteModal } from '../modals/editor-modal-delete';
import {
  updateActiveSlide,
  updateActiveSlidePosition,
  useActiveSlidePosition,
} from '../../../../page-editor-hooks';

const TreeViewModule = (props: TreeViewModuleProps) => {
  const { tree, project, idx } = props;
  const module: ModuleTreeItem = deepCopy(tree);
  const modules = deepCopy(project.modules);
  const activeSlidePosition = useActiveSlidePosition();
  const isActiveModule = activeSlidePosition.moduleIdx === idx;
  const [open, setOpen] = useState(isActiveModule);
  const itemId = `tree-item-module-${idx}-item`;
  const menuId = `tree-item-module-${idx}-menu`;
  const [showModalRename, setModalRename] = useState(false);
  const toggleModalRename = () => setModalRename(!showModalRename);
  const [showModalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!showModalDelete);

  const addLesson = () => {
    console.log('[module action] adding lesson - start');
    if (!modules) {
      return;
    }

    const newIdx = module.lessons.length;
    const newLesson: LessonTreeItem = {
      name: 'Untitled Lesson',
      slides: [
        {
          name: 'Untitled Slide',
        },
      ],
    };

    modules[idx].lessons.push(newLesson);
    console.log('[module action] adding lesson - project update');
    Projects.update({ modules });
    console.log('[module action] adding lesson - setting active slide');
    updateActiveSlide(modules[idx].lessons[newIdx].slides[0], {
      moduleIdx: idx,
      lessonIdx: newIdx,
      slideIdx: 0,
    });
    console.log('[module action] adding lesson - exploring templates');
    Templates.explore();
    console.log('[module action] adding lesson - end');
  };

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
        console.log('[module action menu] adding module - start');
        const newIdx = idx + 1;
        const newModule: ModuleTreeItem = {
          name: 'Untitled Module',
          lessons: [
            {
              name: 'Untitled Lesson',
              slides: [{ name: 'Untitled Slide' }],
            },
          ],
        };

        modules.splice(newIdx, 0, newModule);
        console.log('[module action menu] adding module - updating project');
        Projects.update({ modules });
        console.log(
          '[module action menu] adding module - setting active slide'
        );
        updateActiveSlide(modules[newIdx].lessons[0].slides[0], {
          moduleIdx: newIdx,
          lessonIdx: 0,
          slideIdx: 0,
        });
        console.log('[module action menu] adding module - exploring templates');
        Templates.explore();
        console.log('[module action menu] adding module - end');
      },
    },
    {
      // name: 'move_up',
      label: 'Move Up',
      icon: 'arrow_upward',
      display: 'outlined',
      actionHandler: () => {
        const newIdx = idx - 1;
        const module = moveTreeItem(idx, newIdx, modules);

        if (!module) {
          return;
        }

        updateActiveSlidePosition({ moduleIdx: newIdx });
        Projects.update({ modules });
      },
    },
    {
      // name: 'move_down',
      label: 'Move Down',
      icon: 'arrow_downward',
      display: 'outlined',
      actionHandler: () => {
        const newIdx = idx + 1;
        const module = moveTreeItem(idx, newIdx, modules);

        if (!module) {
          return;
        }

        updateActiveSlidePosition({ moduleIdx: newIdx });
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

  if (isActiveModule && !open) {
    setOpen(isActiveModule);
  }

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
              <Icon icon="folder" display="outlined" opsz={20} filled={!open} />
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
