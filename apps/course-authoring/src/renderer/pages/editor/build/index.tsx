import React from 'react';
import * as style from './styles.module.scss';
import { NavigationDrawer } from '@owlui/lib';

export const PageRoute = '/build';
export const PageName = 'Build';

export const PageElement = () => {
  return (
    <div className={style.build}>
      <NavigationDrawer />
      <main></main>
      <NavigationDrawer />
    </div>
  );
};

export default {
  PageRoute,
  PageName,
  PageElement,
};
