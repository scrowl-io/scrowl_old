import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as styles from './page-settings.module.scss';
import { Preferences } from '../../models';
import { PageNavItems } from './page-settings-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Theme } from './page-settings-theme';
import { Advanced } from './page-settings-advanced';

const preference = new Preferences();

export const PageElement = () => {
  const preferenceData = preference.useData();
  const isProcessing = preference.useProcessing();

  console.log('preferenceData', preferenceData);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      {isProcessing ? (
        <div>Loading...</div>
      ) : (
        <main className={styles.settings}>
          <h1>Settings Page</h1>

          <nav>
            <Link to="one">Theme</Link>
            <Link to="two">Advanced</Link>
          </nav>

          <Routes>
            <Route path="one" element={Theme(preferences)} />
            <Route path="two" element={Advanced(preferences)} />
            <Route path="*" element={<Theme />} />
          </Routes>

          <div className={styles.buttonContainer}>
            <button onClick={() => updatePreferences()}>Update</button>
          </div>
        </main>
      )}
    </>
  );
};

export default {
  PageElement,
};
