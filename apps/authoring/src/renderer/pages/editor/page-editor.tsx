import React from 'react';
import * as styles from './page-editor.module.scss';
import { Logo } from '../../components/';

export const PageElement = () => {
  return (
    <>
      <main className={styles.editor}>
        <Logo />
      </main>
    </>
  );
};

export default {
  PageElement,
};
