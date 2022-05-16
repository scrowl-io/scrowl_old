import React from 'react';
import style from './styles.module.scss';
import { NavigationBar } from '../../components/navigationbar';
import { Route, Routes } from 'react-router-dom';
import { PageNavItems, PageChildren } from './routes';

export const PageRoute = '/editor/*';
export const PageName = 'Course Editor';

export const PageElement = () => {
  return (
    <div className={style.editor}>
      <NavigationBar pages={PageNavItems} />
      <Routes>
        {PageChildren.map((page, index) => {
          return (
            <Route
              key={index}
              path={`${page.PageRoute}`}
              element={<page.PageElement />}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default {
  PageName,
  PageRoute,
  PageElement,
};
