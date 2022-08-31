import React from 'react';
import * as styles from '../editor-pane-details.module.scss';
import { Projects } from '../../../../../models';
import { TreeViewModules } from './tree-view';

export const TabOutline = () => {
  const project = Projects.useData();
  const tabStyles = `${styles.tabOutline} tree-view nav flex-column`;
  const handleAddModule = () => {
    console.log('adding new module');
  };

  return (
    <div className={tabStyles}>
      <>
        <TreeViewModules tree={project.modules} project={project} />
        <button onClick={handleAddModule}>Add Module</button>
      </>
    </div>
  );
};

export default {
  TabOutline,
};
