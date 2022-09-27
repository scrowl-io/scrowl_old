import React from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { Projects } from '../../../../../models';
import { TreeViewModules } from './tree-view';
import { ModuleTreeItem } from './tree-view/editor-tree-view.types';
import { AddButton } from './buttons/add-button';
import { deepCopy } from './tree-view/utils';

export const TabOutline = () => {
  const project = Projects.useData();
  const tabStyles = `${styles.tabOutline} tree-view nav flex-column`;
  const handleAddModule = () => {
    const newModule: ModuleTreeItem = {
      name: 'Untitled Module',
      lessons: [
        {
          name: 'Untitled Lesson',
          slides: [{ name: 'Untitled Slide' }],
        },
      ],
    };

    const modules = deepCopy(project.modules);
    modules.push(newModule);
    Projects.update({ modules });
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
