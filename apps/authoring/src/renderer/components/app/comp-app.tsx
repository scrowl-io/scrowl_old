import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { AppMainProps } from './comp-app.types';
import { pageRoutes } from './comp-app-routes';
import { Menu } from '../../services';
import { Editor, PageNavProps } from '../../pages';
import { Preferences, Projects } from '../../models';

const routeList: PageNavProps = [];

const AppRoutes = () => {
  const pageRouteElements = pageRoutes.map((page, index) => {
    routeList.push(page.PageRoutes.base);
    return (
      <Route
        key={index}
        path={`${page.PageRoutes.base.url}`}
        element={<page.PageElement></page.PageElement>}
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

const Main = (props: AppMainProps) => {
  Preferences.useOpen();
  Projects.useOpen();
  Projects.useMenuEvents();

  return (
    <div {...props}>
      <div className={styles.content}>
        <AppRoutes />
      </div>
    </div>
  );
};

export const Loader = () => {
  return <div>Loading...</div>;
};

export const App = () => {
  const preference = Preferences.useData();
  const prefInit = Preferences.useInit();
  const projectInit = Projects.useInit();
  const [appTheme, setAppTheme] = useState('');
  const [appInit, setAppInit] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let ready = false;
    const initializations = [Menu.Global.init()];

    Promise.allSettled(initializations).then(() => {
      if (ready) {
        return;
      }

      setAppInit(true);

      if (appInit && prefInit && projectInit) {
        setAppTheme(`theme--${preference.theme}`);
        setAppReady(true);
      }
    });

    return () => {
      ready = true;
    };
  }, [appInit, appTheme, preference, prefInit, projectInit]);

  return (
    <Router>{appReady ? <Main className={appTheme} /> : <Loader />}</Router>
  );
};

export default {
  App,
};
