import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { pageRoutes } from './comp-app-routes';
import { Editor, PageNavProps } from '../../pages';
import { TitleBar } from './elements';

const routeList: PageNavProps = [];

const createRouting = () => {
  return pageRoutes.map((page, index) => {
    routeList.push(page.PageRoutes.base);
    return (
      <Route
        key={index}
        path={`${page.PageRoutes.base.url}`}
        element={page.PageElement()}
      />
    );
  });
};

export const App = () => {
  // const appRoutes = createRouting();
  // {appRoutes}
  // <Route
  //   path="*"
  //   element={<Navigate to={Home.PageRoutes.base.url} />}
  // />
  return (
    <Router>
      <TitleBar routes={routeList} />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Editor.PageElement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default {
  App,
};
