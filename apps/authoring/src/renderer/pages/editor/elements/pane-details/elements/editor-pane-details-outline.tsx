import React from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { Projects, Templates } from '../../../../../models';
import { TreeViewModules } from './tree-view';
import { ModuleTreeItem } from './tree-view/editor-tree-view.types';
import { AddButton } from './buttons/add-button';
import { deepCopy } from './tree-view/utils';
import { updateActiveSlide } from '../../../page-editor-hooks';

export const TabOutline = () => {
  const project = Projects.useData();
  const tabStyles = `${styles.tabOutline} tree-view nav flex-column`;
  const handleAddModule = () => {
    console.log('[outline action] adding module - start');
    const modules = deepCopy(project.modules);
    const newIdx = modules.length;
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
    console.log('[outline action] adding module - project update');
    Projects.update({ modules });
    console.log('[outline action] adding module - setting active slide');
    updateActiveSlide(modules[newIdx].lessons[0].slides[0], {
      moduleIdx: newIdx,
      lessonIdx: 0,
      slideIdx: 0,
    });
    console.log('[outline action] adding module - exploring templates');
    Templates.explore();
    console.log('[outline action] adding module - end');
  };

  return (
    <div className={tabStyles}>
      <>
        <TreeViewModules tree={project.modules} project={project} />
        <AddButton label="Add Module" onClick={handleAddModule} />
      </>
    </div>
  );
};

export default {
  TabOutline,
};
