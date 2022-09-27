import React, { useState } from 'react';
import * as styles from '../../editor-pane-details.module.scss';
import { Icon, Button } from '@owlui/lib';
import { Projects, Templates } from '../../../../../../models';
import { ActionMenu, ActionMenuItem } from '../../../../../../components';
import {
  ModuleTreeItem,
  LessonTreeItem,
  SlideTreeItem,
  TreeViewSlidesProps,
  TreeViewSlideProps,
} from './editor-tree-view.types';
import { deepCopy, moveTreeItem } from './utils';
import { RenameModal } from '../modals/editor-modal-rename';
import { DeleteModal } from '../modals/editor-modal-delete';
import {
  updateActiveSlide,
  updateActiveSlidePosition,
  useActiveSlidePosition,
} from '../../../../page-editor-hooks';

const TreeViewSlide = (props: TreeViewSlideProps) => {
  const { tree, idx, moduleIdx, lessonIdx, project } = props;
  const itemId = `module-${moduleIdx}-lesson-${lessonIdx}-slide-item-${idx}`;
  const itemWrapperId = `${itemId}-wrapper`;
  const modules = deepCopy(project.modules);
  const slideModule: ModuleTreeItem = modules[moduleIdx];
  const slideLesson: LessonTreeItem = slideModule.lessons[lessonIdx];
  const slide: SlideTreeItem = slideLesson.slides[idx];
  const activeSlidePosition = useActiveSlidePosition();
  const [showModalRename, setModalRename] = useState(false);
  const toggleModalRename = () => setModalRename(!showModalRename);
  const [showModalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!showModalDelete);

  const slideMenuItems: Array<ActionMenuItem> = [
    {
      id: 'slide-menu-rename',
      label: 'Rename',
      icon: 'edit',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        toggleModalRename();
      },
    },
    {
      id: 'slide-menu-duplicate',
      label: 'Duplicate',
      icon: 'content_copy',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        if (!modules) {
          return;
        }

        const newSlide: SlideTreeItem = {
          name: slide.name + ' copy',
        };
        const newIdx = idx + 1;

        slideLesson.slides.splice(newIdx, 0, newSlide);
        Projects.update({ modules });
        updateActiveSlide(slideLesson.slides[newIdx], {
          moduleIdx,
          lessonIdx,
          slideIdx: newIdx,
        });
      },
    },
    {
      id: 'slide-menu-add-slide',
      label: 'Add Slide',
      icon: 'rectangle',
      display: 'outlined',
      actionHandler: () => {
        const newSlide: SlideTreeItem = {
          name: 'Untitled Slide',
        };
        const newIdx = idx + 1;

        slideLesson.slides.splice(newIdx, 0, newSlide);
        Projects.update({ modules });
        updateActiveSlide(slideLesson.slides[newIdx], {
          moduleIdx,
          lessonIdx,
          slideIdx: newIdx,
        });
        Templates.explore();
      },
    },
    {
      label: 'Move Up',
      icon: 'arrow_upward',
      display: 'outlined',
      actionHandler: () => {
        const newIdx = idx - 1;
        const slide = moveTreeItem(idx, newIdx, slideLesson.slides);

        if (!slide) {
          return;
        }

        updateActiveSlidePosition({ slideIdx: newIdx });
        Projects.update({ modules });
      },
    },
    {
      label: 'Move Down',
      icon: 'arrow_downward',
      display: 'outlined',
      actionHandler: () => {
        const newIdx = idx + 1;
        const slide = moveTreeItem(idx, newIdx, slideLesson.slides);

        if (!slide) {
          return;
        }

        updateActiveSlidePosition({ slideIdx: newIdx });
        Projects.update({ modules });
      },
    },
    {
      id: 'slide-menu-delete-slide',
      label: 'Delete Slide',
      icon: 'delete',
      display: 'outlined',
      filled: true,
      actionHandler: () => {
        toggleModalDelete();
      },
    },
  ];

  const handleRename = (name: string) => {
    slide.name = name;
    Projects.update({ modules });
  };

  const handleDelete = () => {
    slideLesson.slides.splice(idx, 1);
    Projects.update({ modules });
  };

  const handleSlideSelection = () => {
    updateActiveSlide(tree, {
      moduleIdx,
      lessonIdx,
      slideIdx: idx,
    });
  };

  const isActiveSlide =
    activeSlidePosition.moduleIdx === moduleIdx &&
    activeSlidePosition.lessonIdx === lessonIdx &&
    activeSlidePosition.slideIdx === idx;
  const classes = `${styles.treeViewHeader} ${
    isActiveSlide ? 'slideActive' : ''
  }`;

  return (
    <div className={styles.treeViewSlide} key={idx}>
      <div id={itemWrapperId} className={classes}>
        <Button
          id={itemId}
          className={styles.treeViewItem}
          variant="link"
          onClick={handleSlideSelection}
        >
          <span className={styles.treeViewItemIconDetail}>
            <Icon icon="rectangle" display="outlined" />
          </span>
          <span className={styles.treeViewItemLabel}>{tree.name}</span>
        </Button>
        <ActionMenu
          menu-items={slideMenuItems}
          title="title"
          children={<></>}
        />
      </div>
      <RenameModal
        label="Rename Slide"
        value={tree.name}
        onSubmit={handleRename}
        show={showModalRename}
        onHide={toggleModalRename}
      />
      <DeleteModal
        title="Delete Slide"
        label="Are you sure you want to delete this slide?"
        onSubmit={handleDelete}
        show={showModalDelete}
        onHide={toggleModalDelete}
      />
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
