import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route as Path,
  Navigate,
} from 'react-router-dom';
import * as appStyles from './app.module.scss';
import { createPage } from '../page';
import { Element as Nav } from '../navigation';

const pages = [createPage('/', 'Hello World')];

const createRoutes = () => {
  const routes: Array<JSX.Element> = [];

  pages.forEach((page, index) => {
    routes.push(
      <Path key={index} path={`${page.Route}`} element={<page.Element />} />
    );
  });

  return routes;
};

export const Element = () => {
  const AppRoutes = createRoutes();
  console.log(appStyles);
  return (
    <Router>
      <div className={appStyles.app}>
        <Nav />
        <main className={appStyles.appMain}>
          <Routes>
            {AppRoutes}
            <Path path="*" element={<Navigate to={pages[0].Route} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default {
  Element,
};
