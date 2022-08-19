import React from 'react';
import * as styles from './page-editor.module.scss';
import { LeftPane } from '../../components/leftpane/comp-leftpane';

// const publishProject = () => {
//   window.electronAPI.ipcRenderer
//     .invoke('publish-project', {
//       title: 'Scrowl Player Test',
//       manifest,
//     })
//     .then((msg: string) => {
//       console.log(`packaged ${msg}`);
//     });
// };

export const PageElement = () => {
  return (
    <>
      <main className={styles.editor}>
        <div className="side-panel">
          <LeftPane />
        </div>
      </main>
    </>
  );
};

export default {
  PageElement,
};
