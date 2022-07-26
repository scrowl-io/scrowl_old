import React from 'react';
import * as style from './styles.module.scss';
import { NavigationDrawer as Nav } from '@owlui/lib';

export const PageRoute = '/build';
export const PageName = 'Build';

export const PageElement = () => {
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
  PageElement,
};
