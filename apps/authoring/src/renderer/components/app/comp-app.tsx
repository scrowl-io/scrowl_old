import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { AppMainProps } from './comp-app.types';
import { pageRoutes } from './comp-app-routes';
import { TitleBar } from './elements';
import { Menu } from '../../services';
import { Editor, PageNavProps } from '../../pages';
import { Preferences } from '../../models';

const routeList: PageNavProps = [];
const preference = new Preferences.Preferences();

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
  preference.ready();
  preference.useOpen();

  return (
    <div {...props}>
      <TitleBar routes={routeList} />
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
  const [appTheme, setAppTheme] = useState('');
  const [appInit, setAppState] = useState(false);

  useEffect(() => {
    const initializations = [Menu.Global.init(), preference.get()];

    Promise.allSettled(initializations).then(([menuInit, prefInit]) => {
      if (prefInit.status === 'rejected') {
        console.error(`Failed to initialize preferences`);
        return;
      }

      const prefRes = prefInit.value;

      if (prefRes.error) {
        console.error(prefRes);
        return;
      }

      setAppTheme(`theme--${prefRes.data.preferences.theme}`);
      setAppState(true);
    });
  }, [appInit, appTheme]);

  return (
    <Router>{appInit ? <Main className={appTheme} /> : <Loader />}</Router>
  );
};

export default {
  App,
};
