import React from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { ActionMenu, ActionMenuItem } from '../../../../../components';
import { outlineData } from './mock-data';

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

const moduleMenuItems: Array<ActionMenuItem> = [
  {
    label: 'Add Lesson',
    icon: 'widgets',
    iconStyle: 'Outlined',
  },
  {
    label: 'Rename',
    icon: 'edit',
    iconStyle: 'Outlined',
  },
  {
    label: 'Duplicate',
    icon: 'content_copy',
    iconStyle: 'Outlined',
  },
  {
    label: 'Add Module After',
    icon: 'folder',
    iconStyle: 'Outlined',
  },
  {
    label: 'Move Up',
    icon: 'arrow_upward',
    iconStyle: 'Outlined',
  },
  {
    label: 'Move Down',
    icon: 'arrow_downward',
    iconStyle: 'Outlined',
  },
  {
    label: 'Delete Module',
    icon: 'delete',
    iconStyle: 'Outlined',
  },
];
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

const TreeViewSlides = (data: SlideTree) => {
  return data.map((tree, idx: number) => {
    return (
      <div className="tree-view--slide" key={idx}>
        <div className="tree-view__header">
          <div>{tree.name}</div>
          <ActionMenu
            menu-items={slideMenuItems}
            title="title"
            children={<></>}
          />
        </div>
      </div>
    );
  });
};

const TreeViewLessons = (data: LessonTree) => {
  return data.map((tree, idx: number) => {
    return (
      <div className="tree-view--lesson" key={idx}>
        <div className="tree-view__header">
          <div>{tree.name}</div>
          <ActionMenu
            menu-items={lessonMenuItems}
            title="title"
            children={<></>}
          />
        </div>
        <div className="tree-view__body">{TreeViewSlides(tree.slides)}</div>
      </div>
    );
  });
};

const TreeViewModules = (data: ProjectTree) => {
  return data.map((tree, idx: number) => {
    return (
      <div className="tree-view--module" key={idx}>
        <div className="tree-view__header">
          <div>{tree.name}</div>
          <ActionMenu
            menu-items={moduleMenuItems}
            title="title"
            children={<></>}
          />
        </div>
        <div className="tree-view__body">{TreeViewLessons(tree.lessons)}</div>
      </div>
    );
  });
};

export const TabOutline = () => {
  const outlineTree = TreeViewModules(outlineData);

  return <div className="tree-view">{outlineTree}</div>;
};

export default {
  TabOutline,
};
