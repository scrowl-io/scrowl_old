import React, { useState } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as style from './styles/styles.module.scss';
import { appRoutes } from './routes';
import { TitleBar } from '../titlebar';
import { TitleBarProps } from '../titlebar/index.types';

const renderAppRoutes = (handleTitleChange: (pages: TitleBarProps) => void) => {
  return appRoutes.pages.map((page, index) => {
    return (
      <Route
        key={index}
        path={`${page.PageRoute}`}
        element={
          page.PageElement ? (
            <page.PageElement handleTitleChange={handleTitleChange} />
          ) : null
        }
      />
    );
  });
};

export const App = () => {
  const [titlePages, setTitlePages] = useState(appRoutes.pages);

  function handleTitleChange(pages: TitleBarProps) {
    const newRoutes = [...titlePages];

    Object.entries(pages.pages).map(page => {
      newRoutes.push(page[1]);
    });

    setTitlePages(newRoutes);
  }

  return (
    <Router>
      <TitleBar pages={titlePages} />
      <div className={style.content}>
        <Routes>
          {renderAppRoutes(handleTitleChange)}
          <Route path="*" element={<Navigate to={appRoutes.basename} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default {
  App,
};
