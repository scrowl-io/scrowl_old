import React from 'react';
import * as styles from './page-editor.module.scss';
import { PageNavItems } from './page-editor-routes';
import { NavigationBar } from '../../components/navigationbar';
import { manifest } from './manifest';

const publishProject = () => {
  window.electronAPI.ipcRenderer
    .invoke('publish-project', {
      title: 'Scrowl Player Test',
      manifest,
    })
    .then((msg: string) => {
      console.log(`packaged ${msg}`);
    });
};

export const PageElement = () => {
  return (
    <>
      <NavigationBar />
      <main className={styles.editor}>
        <h1>Editor Page</h1>
      </main>
    </>
  );
};

export default {
  PageElement,
};
