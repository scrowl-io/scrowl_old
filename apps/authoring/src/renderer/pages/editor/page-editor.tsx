import React, { useState } from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';
import { ProjectData } from '../../../main/models/projects/index';
import { create } from '../../services/state/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppDispatch, RootState } from '../../store';

const project: ProjectData = {
  name: 'new project',
  description: 'project description',
  theme: 'SCROWL',
  workingFile: 'file/newfile',
  workingDir: 'file',
  workingImports: [''],
  saveFile: '',
  saveDir: '',
};

export const PageElement = () => {
  const [projectData, setProjectData] = useState({});
  const project: ProjectData = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  const handler = () => {
    window.electronAPI.ipcRenderer.invoke('/projects/create').then(res => {
      console.log('project create', res);
      // useAppDispatch(create(res));
      // setProjectData(res);
      dispatch(create(res));
    });
  };

  // console.log('hanler', dispatch(create(projectData)));

  console.log('project GLOBAL state', project);

  return (
    <>
      <main className={styles.editor}>
        <Header />

        <div className={styles.workspace}>
          <PaneDetails />
          <button onClick={handler}>TEST REDUX</button>
        </div>
      </main>
    </>
  );
};

export default {
  PageElement,
};
