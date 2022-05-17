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
import { PageNav } from '../../pages/index.types';

const renderAppRoutes = (handleTitleChange: { (pages: PageNav): void }) => {
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
  const [titlesList, setTitlesList] = useState(appRoutes.pages);

  const handleTitleChange = (pages: PageNav) => {
    const newTitles = [...titlesList];

    pages.map(page => {
      if (!newTitles.some(title => title.PageName === page.label)) {
        newTitles.push({ PageName: page.label, PageRoute: page.link });
      }
    });

    setTitlesList(newTitles);
  };

  return (
    <Router>
      <TitleBar pages={titlesList} />
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
