import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project } from '../../models';
import { requester } from '../../services';
import { FileFromDirData } from '../../../main/services/file-system';

const project = new Project();

export const PageElement = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  project.ready();

  const isProcessing = project.useProcessing();
  const projectModelData = project.useProjectData();

  // Example of how to fetch a list of recent projects from the backend. Endpoint "/projects/lists/recent":
  useEffect(() => {
    requester.invoke('/projects/list/recent').then(result => {
      if (result.data) {
        setRecentFiles(result.data.files);
      }
    });
  }, []);

  // Example of how handle the click to open a recent project:
  const handleOpenProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    requester
      .invoke('/projects/open', e.currentTarget.dataset.file)
      .then(result => project.setProjectData(result.data.project));
  };

  console.log(projectModelData);
  console.log(recentFiles);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        {recentFiles.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
              {recentFiles.map((recentFile: FileFromDirData, index) => (
                <button
                  key={index}
                  data-file={recentFile.fileLocation}
                  onClick={handleOpenProject}
                >
                  {recentFile.projectName}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default {
  PageElement,
};
