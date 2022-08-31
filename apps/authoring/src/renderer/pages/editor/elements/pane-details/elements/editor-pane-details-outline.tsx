import React, { useCallback, useState } from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import Collapse from 'react-bootstrap/Collapse';
import { ActionMenu, ActionMenuItem } from '../../../../../components';
import { Projects } from '../../../../../models';
import { ProjectData } from '../../../../../models/projects';

export type SlideTreeItem = {
  name: string;
};

export type SlideTree = Array<SlideTreeItem>;

export type LessonTreeItem = {
  name: string;
  slides: SlideTree;
};

export type LessonTree = Array<LessonTreeItem>;

export type ModuleTreeItem = {
  name: string;
  lessons: LessonTree;
};

export type ProjectTree = Array<ModuleTreeItem>;

const menuItemAction = (e: React.BaseSyntheticEvent) => {
  console.log(e.target.firstChild.textContent);
};

const addLesson = (project: ProjectData, index: number) => {
  const newLesson = { name: 'untitled', slides: [{ name: 'untitled' }] };
  const lessonsLength = project?.modules?[index].lessons.length;

  Projects.update({
    ...project,
    modules: project?.modules?.splice(
      index,
      0, 
      {
        ...project.modules[index], 
        lessons: project.modules[index].lessons.splice(
          lessonsLength,
          0,
          newLesson
        )
      }
    )
  });
};

const duplicateModule = (project: ProjectData, index: number) => {
  Projects.update({
    payload: {
      ...project,
      modules: project?.modules?.splice(index, 0, project.modules[index]),
    },
  });
};

const addModule = (project: ProjectData, index: number | null) => {
  const newModule = {
    name: 'untitled',
    lessons: [{ name: 'untitled', slides: [{ name: 'untitled' }] }],
  };

  Projects.update({
    payload: {
      ...project,
      modules: project?.modules?.splice(
        !index ? project.modules.length : index,
        0,
        newModule
      ),
    },
  });
};

const deleteModule = (project: ProjectData, index: number) => {
  Projects.update({
    payload: {
      ...project,
      modules: project?.modules?.splice(index, 0),
    },
  });
};

const lessonMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Add Slide',
    icon: 'crop_square',
    iconStyle: 'Outlined',
  },
];
const slideMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Rename',
    icon: 'edit',
    iconStyle: 'Outlined',
  },
];

const TreeViewSlide = (tree: SlideTreeItem, id: string) => {
  const itemId = `${id}-slide-item`;
  return (
    <div className={styles.treeViewSlide} key={id}>
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

const TreeViewSlides = (data: SlideTree, parentId: string) => {
  return data.map((tree, idx: number) => {
    return TreeViewSlide(tree, `${parentId} - ${idx}`);
  });
};

const TreeViewLesson = (tree: LessonTreeItem, id: string) => {
  const [open, setOpen] = useState(false);
  const itemId = `${id}-lesson-item`;
  const menuId = `${id}-lesson-menu`;

  return (
    <div className={styles.treeViewLesson} key={id}>
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
          {TreeViewSlides(tree.slides, itemId)}
        </div>
      </Collapse>
    </div>
  );
};

const TreeViewLessons = (data: LessonTree, parentId: string) => {
  return data.map((tree, idx: number) => {
    return TreeViewLesson(tree, `${parentId} - ${idx}`);
  });
};

const TreeViewModule = (tree: ModuleTreeItem, idx: number) => {
  const [open, setOpen] = useState(false);
  const itemId = `tree-item-module-${idx}-item`;
  const menuId = `tree-item-module-${idx}-menu`;

  const { project } = Projects.useData();

  const moduleMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Add Lesson',
      icon: 'widgets',
      iconStyle: 'Outlined',
      action: index => addLesson(project, index),
    },
    {
      label: 'Rename',
      icon: 'edit',
      iconStyle: 'Outlined',
      action: menuItemAction,
    },
    {
      label: 'Duplicate',
      icon: 'content_copy',
      iconStyle: 'Outlined',
      action: index => duplicateModule(project, index),
    },
    {
      label: 'Add Module After',
      icon: 'folder',
      iconStyle: 'Outlined',
      action: index => addModule(project, index),
    },
    {
      label: 'Move Up',
      icon: 'arrow_upward',
      iconStyle: 'Outlined',
      action: menuItemAction,
    },
    {
      label: 'Move Down',
      icon: 'arrow_downward',
      iconStyle: 'Outlined',
      action: menuItemAction,
    },
    {
      label: 'Delete Module',
      icon: 'delete',
      iconStyle: 'Outlined',
      action: index => deleteModule(project, index),
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
          {TreeViewLessons(tree.lessons, itemId)}
        </div>
      </Collapse>
    </div>
  );
};

const TreeViewModules = (data: ProjectTree) => {
  return data.map(TreeViewModule);
};

export const TabOutline = () => {
  const project = Projects.useData();
  const tabStyles = `${styles.tabOutline} tree-view nav flex-column`;
  const treeView = TreeViewModules(project.modules);

  return (
    <div className={tabStyles}>
      {treeView}
      <button onClick={() => addModule(project, null)}>Add Module</button>
    </div>
  );
};

export default {
  TabOutline,
};
