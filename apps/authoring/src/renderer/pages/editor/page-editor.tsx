import React from 'react';
import * as styles from './page-editor.module.scss';
import { LeftPane } from '../../components/';

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
