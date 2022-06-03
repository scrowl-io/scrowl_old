import React, { useEffect } from 'react';
import style from './styles.module.scss';
import { NavigationBar } from '../../components/navigationbar';
import { Route, Routes } from 'react-router-dom';
import { PageNavItems, PageChildren } from './routes';
import { PageProps } from '../index.types';

export const PageRoute = '/editor/*';
export const PageName = 'Course Editor';

const exportPackage = () => {
  window.electronAPI.ipcRenderer
    .invoke('package-course', {
      courseName: 'Test Course',
    })
    .then((msg: string) => {
      console.log(`packaged ${msg}`);
    });
};

export const PageElement = ({ handleTitleChange }: PageProps) => {
  const pageRoutes = PageNavItems.map(page => {
    return { label: page.label, link: page.link };
  });

  useEffect(() => {
    handleTitleChange(pageRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.editor}>
      <NavigationBar pages={PageNavItems} exportPackage={exportPackage} />
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
