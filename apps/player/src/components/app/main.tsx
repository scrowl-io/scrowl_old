import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as styles from './app.module.scss';
import { get as getManifest } from './manifest';
import { ProjectConfig, LayoutItemProps } from '../project/project.types';
import { createLayout } from '../project';
import { Element as Nav } from '../navigation';
import { NavigationDrawerContentTypes } from '@owlui/lib';
import { Element as Error } from './error';

const createRoutes = (manifestData: ProjectConfig) => {
  const layout = createLayout(manifestData);
  const routes: Array<JSX.Element> = [];
  const navItems: Array<NavigationDrawerContentTypes> = [];

  layout.forEach((layoutItem: LayoutItemProps, index: number) => {
    navItems.push({
      label: layoutItem.name,
      url: layoutItem.Route.replace('/', '#/'),
    });
    routes.push(
      <Route
        key={index}
        path={`${layoutItem.Route}`}
        element={<layoutItem.Element />}
      />
    );
  });

  return {
    layout,
    routes,
    navItems,
  };
};

export const Element = () => {
  const manifest = getManifest();

  if (manifest.error) {
    return <Error msg={manifest.message} />;
  }

  if (!manifest.data) {
    return <Error msg="Manifest does not have data" />;
  }

  const { layout, routes, navItems } = createRoutes(manifest.data);

  return (
    <Router>
      <div className={styles.app}>
        <Nav items={navItems} />
        <main className={styles.appMain}>
          <Routes>
            {routes}
            <Route path="*" element={<Navigate to={layout[0].Route} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default {
  Element,
};
