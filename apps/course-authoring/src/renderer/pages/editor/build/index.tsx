import React from 'react';
import * as style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';

export const PageRoute = '/build';
export const PageName = 'Build';

export const Element = () => {
  return (
    <section className={style.build}>
      <Nav />
      <main></main>
      <Nav />
    </section>
  );
};

export default {
  PageRoute,
  PageName,
  Element,
};
