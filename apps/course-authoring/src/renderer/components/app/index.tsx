import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as style from './styles/styles.module.scss';
import appRoutes from './routes';
import { TitleBar } from '../titlebar';

const renderAppRoutes = () => {
  return appRoutes.pages.map((page, index) => {
    return (
      <Route key={index} path={`${page.Route}`} element={<page.Element />} />
    );
  });
};

export const App = () => {
  return (
    <Router>
      <TitleBar pages={appRoutes.pages} />
      <div className={style.content}>
        <Routes>
          {renderAppRoutes()}
          <Route path="*" element={<Navigate to={appRoutes.basename} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default {
  App,
};
