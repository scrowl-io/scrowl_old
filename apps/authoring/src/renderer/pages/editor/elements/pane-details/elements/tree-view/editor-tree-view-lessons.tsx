import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import { AddButton } from '../buttons/add-button';
import Collapse from 'react-bootstrap/Collapse';
import { Projects, Templates } from '../../../../../../models';
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
import { RenameModal } from '../modals/editor-modal-rename';
import { DeleteModal } from '../modals/editor-modal-delete';
import { updateActiveSlide } from '../../../../page-editor-hooks';

const TreeViewLesson = (props: TreeViewLessonProps) => {
  const { tree, idx, moduleIdx, project } = props;
  const [open, setOpen] = useState(false);
  const itemId = `module-${moduleIdx}-lesson-item-${idx}`;
  const menuId = `module-${moduleIdx}-lesson-menu-${idx}`;
  const modules = deepCopy(project.modules);
  const lessonModule: ModuleTreeItem = modules[moduleIdx];
  const lesson: LessonTreeItem = lessonModule.lessons[idx];
  const [showModalRename, setModalRename] = useState(false);
  const toggleModalRename = () => setModalRename(!showModalRename);
  const [showModalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!showModalDelete);

  const addSlide = () => {
    const newSlide: SlideTreeItem = {
      name: 'Untitled Slide',
    };
    const slideIdx = lesson.slides.length;

    lesson.slides.push(newSlide);
    Projects.update({ modules });
    updateActiveSlide(lesson.slides[slideIdx], {
      moduleIdx,
      lessonIdx: idx,
      slideIdx,
    });
    Templates.explore();
  };

  const lessonMenuItems: Array<ActionMenuItem> = [
    {
      id: 'lesson-menu-add-slide',
      label: 'Add Slide',
      icon: 'rectangle',
      display: 'outlined',
      actionHandler: addSlide,
    },
    {
      id: 'lesson-menu-rename',
      label: 'Rename',
      icon: 'edit',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        toggleModalRename();
      },
    },
    {
      id: 'lesson-menu-duplicate',
      label: 'Duplicate',
      icon: 'content_copy',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        const newLesson: LessonTreeItem = {
          name: lesson.name + ' copy',
          slides: deepCopy(lesson.slides),
        };

        lessonModule.lessons.splice(idx + 1, 0, newLesson);
        Projects.update({ modules });
      },
    },
    {
      id: 'lesson-menu-add-lesson',
      label: 'Add Lesson',
      icon: 'interests',
      filled: true,
      display: 'outlined',
      actionHandler: () => {
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
      display: 'outlined',
      actionHandler: () => {
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
      display: 'outlined',
      actionHandler: () => {
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
      id: 'lesson-menu-delete-lesson',
      label: 'Delete Lesson',
      icon: 'delete',
      filled: true,
      display: 'outlined',
      actionHandler: () => {
        toggleModalDelete();
      },
    },
  ];

  const handleRename = (name: string) => {
    lesson.name = name;
    Projects.update({ modules });
  };

  const handleDelete = () => {
    lessonModule.lessons.splice(idx, 1);
    Projects.update({ modules });
  };

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
              <Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={styles.treeViewItemIconDetail}>
              <Icon icon="interests" display="outlined" filled={!open} />
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
          <AddButton onClick={addSlide} label="Add Slide" />
        </div>
      </Collapse>
      <RenameModal
        label="Rename Lesson"
        value={tree.name}
        onSubmit={handleRename}
        show={showModalRename}
        onHide={toggleModalRename}
      />
      <DeleteModal
        title="Delete Lesson"
        label="Are you sure you want to delete this lesson?"
        onSubmit={handleDelete}
        show={showModalDelete}
        onHide={toggleModalDelete}
      />
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
