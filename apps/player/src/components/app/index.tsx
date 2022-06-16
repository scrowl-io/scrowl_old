import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as styles from './app.module.scss';
import { project } from './test-project';
import { createLayout } from '../project';
import { Element as Nav } from '../navigation';
import { NavigationDrawerContentTypes } from '@owlui/navigationdrawer/src/Default/Default.types';
import { LayoutItemProps } from '../project/project.types';

const navItems: Array<NavigationDrawerContentTypes> = [];
const layout = createLayout(project);

const createRoutes = () => {
  const routes: Array<JSX.Element> = [];

  layout.forEach((layoutItem: LayoutItemProps, index: number) => {
    navItems.push({
      label: layoutItem.name,
      // url: layoutItem.Route,
    });
    routes.push(
      <Route
        key={index}
        path={`${layoutItem.Route}`}
        element={<layoutItem.Element />}
      />
    );
  });

  return routes;
};

export const Element = () => {
  const AppRoutes = createRoutes();

  return (
    <Router>
      <div className={styles.app}>
        <Nav items={navItems} />
        <main className={styles.appMain}>
          <Routes>
            {AppRoutes}
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
