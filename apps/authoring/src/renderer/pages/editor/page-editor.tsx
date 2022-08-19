import React from 'react';
import * as styles from './page-editor.module.scss';
import { Header } from './elements';

export const PageElement = () => {
  return (
    <>
      <main className={styles.editor}>
        <Header />
      </main>
    </>
  );
};

export default {
  PageElement,
};
