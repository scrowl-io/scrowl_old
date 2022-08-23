import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as styles from './page-settings.module.scss';
import * as Pages from './pages';
import { Preferences } from '../../models';
import { PageNavItems } from './page-settings-routes';
import { NavigationBar } from '../../components/navigationbar';

const preference = new Preferences();

export const PageElement = () => {
  preference.ready();

  const preferenceData = preference.useData();
  const isProcessing = preference.useProcessing();

  useEffect(() => {
    preference.get().then(result => {
      if (result.error) {
        console.error(result);
      }
    });
  }, []);

  const handleSavePreferences = () => {
    preference.update();
  };

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      {isProcessing ? (
        <div>Loading...</div>
      ) : (
        <main className={styles.settings}>
          <h1>Settings Page</h1>

          <nav>
            <Link to={Pages.Theme.route}>Theme</Link>
            <Link to={Pages.Advanced.route}>Advanced</Link>
          </nav>

          <Routes>
            <Route
              path={Pages.Theme.route}
              element={<Pages.Theme.Element preferences={preferenceData} />}
            />
            <Route
              path={Pages.Advanced.route}
              element={<Pages.Advanced.Element preferences={preferenceData} />}
            />
            <Route
              path="*"
              element={<Pages.Theme.Element preferences={preferenceData} />}
            />
          </Routes>

          <div className={styles.buttonContainer}>
            <button onClick={handleSavePreferences}>Save</button>
          </div>
        </main>
      )}
    </>
  );
};

export default {
  PageElement,
};
