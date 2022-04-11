import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import pageHome from '../../pages/home';
import * as styles from './styles/styles.module.scss';
import { TitleBar } from '../titlebar';

const basename = '/';
const pages = [pageHome];

const createAppRoutes = () => {
  return pages.map((page, index) => {
    return (
      <Route key={index} path={`${page.Route}`} element={<page.Element />} />
    );
  });
};

export const App = () => {
  const AppRoutes = createAppRoutes();

  return (
    <Router>
      <TitleBar pages={pages} />
      <main className={styles.main}>
        <Routes>
          {AppRoutes}
          <Route path="*" element={<Navigate to={basename} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default {
  App,
};
