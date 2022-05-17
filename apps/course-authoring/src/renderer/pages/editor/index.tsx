import React, { useEffect } from 'react';
import style from './styles.module.scss';
import { NavigationBar } from '../../components/navigationbar';
import { Route, Routes } from 'react-router-dom';
import { PageRoutes, PageNavItems, PageChildren } from './routes';
import { PageProps } from '../index.types';

export const PageRoute = '/editor/*';
export const PageName = 'Course Editor';

interface NewRoute {
  PageName: string;
  PageRoute: string;
}
interface NewRoutes {
  pages: NewRoute[];
}

export const PageElement = ({ handleTitleChange }: PageProps) => {
  const newRoutes: NewRoutes = { pages: [] };

  Object.entries(PageRoutes).map(page => {
    newRoutes.pages.push({ PageName: page[0], PageRoute: page[1] });
  });

  useEffect(() => {
    handleTitleChange(newRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
