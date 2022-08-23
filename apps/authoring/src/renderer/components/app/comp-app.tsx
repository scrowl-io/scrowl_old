import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { pageRoutes } from './comp-app-routes';
import { TitleBar } from './elements';
import { Editor, PageNavProps } from '../../pages';
import { Preferences } from '../../models';

const routeList: PageNavProps = [];
const preference = new Preferences();

const AppRoutes = () => {
  const pageRouteElements = pageRoutes.map((page, index) => {
    routeList.push(page.PageRoutes.base);
    return (
      <Route
        key={index}
        path={`${page.PageRoutes.base.url}`}
        element={page.PageElement()}
      />
    );
  });

  return (
    <Routes>
      {pageRouteElements}
      <Route path="/" element={<Editor.PageElement />} />
    </Routes>
  );
};

const Main = () => {
  preference.ready();
  preference.useOpen();

  return (
    <>
      <TitleBar routes={routeList} />
      <div className={styles.content}>
        <AppRoutes />
      </div>
    </>
  );
};

export const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default {
  App,
};
