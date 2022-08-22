import React from 'react';
import * as styles from './page-editor.module.scss';
import { Header, PaneDetails } from './elements';
import { ProjectData } from '../../../main/models/projects/index';
import { create } from '../../services/state/index';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

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
const dispatch: AppDispatch = (data: any) => useDispatch();
export const PageElement = () => {
  const handler = () => {
    dispatch(create(project));
  };
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
