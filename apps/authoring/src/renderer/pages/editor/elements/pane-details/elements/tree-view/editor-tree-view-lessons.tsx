import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import Collapse from 'react-bootstrap/Collapse';
import { Projects } from '../../../../../../models';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  ModuleTreeItem,
  LessonTreeItem,
  SlideTreeItem,
  TreeViewLessonsProps,
  TreeViewLessonProps,
} from './editor-tree-view.types';
import { TreeViewSlides } from './editor-tree-view-slides';
import { deepCopy } from './utils';

const TreeViewLesson = (props: TreeViewLessonProps) => {
  const { tree, idx, moduleIdx, project } = props;
  const [open, setOpen] = useState(false);
  const itemId = `module-${moduleIdx}-lesson-item-${idx}`;
  const menuId = `module-${moduleIdx}-lesson-menu-${idx}`;
  const modules = deepCopy(project.modules);
  const lessonModule: ModuleTreeItem = modules[moduleIdx];
  const lesson: LessonTreeItem = lessonModule.lessons[idx];

  const lessonMenuItems: Array<ActionMenuItem> = [
    {
      label: 'Add Slide',
      icon: 'crop_square',
      iconStyle: 'Outlined',
      action: () => {
        const newSlide: SlideTreeItem = {
          name: 'Umtitled Slide',
        };

        lesson.slides.push(newSlide);
        Projects.update({ modules });
      },
    },
    {
      label: 'Rename',
      icon: 'edit',
      iconStyle: 'Outlined',
      action: () => {
        console.log('rename');
      },
    },
    {
      label: 'Duplicate',
      icon: 'content_copy',
      iconStyle: 'Outlined',
      action: () => {
        lessonModule.lessons.splice(idx + 1, 0, lesson);
        Projects.update({ modules });
      },
    },
    {
      label: 'Add Lesson',
      icon: 'widgets',
      iconStyle: 'Outlined',
      action: () => {
        const newLesson: LessonTreeItem = {
          name: 'Untitled Lesson',
          slides: [
            {
              name: 'Untitled Slide',
            },
          ],
        };

        lessonModule.lessons.push(newLesson);
        Projects.update({ modules });
      },
    },
    {
      label: 'Move Up',
      icon: 'arrow_upward',
      iconStyle: 'Outlined',
      action: () => {
        if (lessonModule.lessons.length <= 1 || idx <= 0) {
          console.log('Invalid operation');
          return;
        }
        [lessonModule.lessons[idx - 1], lessonModule.lessons[idx]] = [
          lessonModule.lessons[idx],
          lessonModule.lessons[idx - 1],
        ];
        Projects.update({ modules });
      },
    },
    {
      label: 'Move Down',
      icon: 'arrow_downward',
      iconStyle: 'Outlined',
      action: () => {
        if (
          lessonModule.lessons.length <= 1 ||
          lessonModule.lessons.length - 1 <= idx
        ) {
          console.log('Invalid operation');
          return;
        }
        [lessonModule.lessons[idx], lessonModule.lessons[idx + 1]] = [
          lessonModule.lessons[idx + 1],
          lessonModule.lessons[idx],
        ];
        Projects.update({ modules });
      },
    },
    {
      label: 'Delete Lesson',
      icon: 'delete',
      iconStyle: 'Outlined',
      action: () => {
        lessonModule.lessons.splice(idx, 1);
        // confirm({
        //   headerText: 'Header',
        //   descriptionText: 'Description',
        //   acceptConfirm: () => Projects.update({ modules }),
        //   cancelConfirm: () => console.log('cancelled'),
        // });
        Projects.update({ modules });
      },
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
