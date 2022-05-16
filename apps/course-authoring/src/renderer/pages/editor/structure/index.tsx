import React from 'react';
import * as style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';

export const PageRoute = '/structure';
export const PageEditorRoute = '/editor/structure';
export const PageName = 'Structure';

export const PageElement = () => {
  return (
    <section className={style.structure}>
      <Nav />
      <main></main>
    </section>
  );
};

export default {
  PageRoute,
  PageEditorRoute,
  PageName,
  PageElement,
};
