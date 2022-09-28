import React from 'react';
import * as styles from './page-editor.module.scss';
import {
  Header,
  PaneDetails,
  RightPane,
  Canvas,
  TemplateExplorerModal,
} from './elements';
import { useInit } from './page-editor-hooks';
import { Navbar } from 'react-bootstrap';

export const PageElement = () => {
  const isInit = useInit();

  return (
    <>
      {!isInit ? (
        <div>Loading...</div>
      ) : (
        <>
          <main className={styles.editor}>
            <Header />
            <PaneDetails />
            <Canvas />
            <RightPane />
            <Navbar className="scrowl__footer" fixed="bottom"></Navbar>
          </main>
          <TemplateExplorerModal />
        </>
      )}
    </>
  );
};

export default {
  PageElement,
};
