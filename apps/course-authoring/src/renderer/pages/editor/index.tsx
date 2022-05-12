import React from 'react';
import style from './styles.module.scss';
import { NavigationBar } from '../../components/navigationbar';
import { Route, Routes } from 'react-router-dom';
import { editorRoutes, navigationLinks } from './routes';

export const PageRoute = '/editor/*';
export const PageName = 'Course Editor';

export const Element = () => {
  return (
    <div className={style.editor}>
      <NavigationBar navigationLinks={navigationLinks} />
      <Routes>
        {editorRoutes.pages.map((page, index) => {
          return (
            <Route
              key={index}
              path={`${page.PageRoute}`}
              element={<page.Element />}
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
  Element,
};
