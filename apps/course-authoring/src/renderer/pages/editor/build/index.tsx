import React from 'react';
import * as style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';

export const PageRoute = '/build';
export const PageName = 'Build';

export const Element = () => {
  return (
    <div className={style.build}>
      <Nav />
      <main></main>
      <Nav />
    </div>
  );
};

export default {
  PageRoute,
  PageName,
  Element,
};
