import React from 'react';
import style from './styles.module.scss';

export const PageRoute = '/settings';
export const PageName = 'Settings';

export const PageElement = () => {
  return (
    <>
      <main className={style.main}>
        <h1>Settings</h1>
      </main>
    </>
  );
};

export default {
  PageName,
  PageRoute,
  PageElement,
};
