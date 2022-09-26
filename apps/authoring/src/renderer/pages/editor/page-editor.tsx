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

            <div className={styles.workspace}>
              <Canvas />
            </div>

            <RightPane />

            <nav className="scrowl__footer owlui-navbar fixed-bottom"></nav>
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
