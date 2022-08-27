import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as styles from './page-settings.module.scss';
import * as Pages from './pages';
import { Preferences } from '../../models';
import { PageNavItems } from './page-settings-routes';
import { NavigationBar } from '../../components/navigationbar';

export const PageElement = () => {
  const preference = Preferences.useData();
  const prefProcessing = Preferences.useProcessing();

  const handleSave = () => {
    Preferences.save(preference);
  };

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.settings}>
        <h1>Settings Page</h1>

        <nav>
          <Link to={Pages.Theme.route}>Theme</Link>
          <Link to={Pages.Advanced.route}>Advanced</Link>
        </nav>

        <Routes>
          <Route path={Pages.Theme.route} element={<Pages.Theme.Element />} />
          <Route
            path={Pages.Advanced.route}
            element={<Pages.Advanced.Element />}
          />
          <Route path="*" element={<Pages.Theme.Element />} />
        </Routes>

        <div>
          <button onClick={() => handleSave()}>
            {prefProcessing ? 'Saving...' : 'Save'}
          </button>
        </div>
      </main>
    </>
  );
};

export default {
  PageElement,
};
