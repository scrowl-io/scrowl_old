import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as styles from './page-settings.module.scss';
import * as Pages from './pages';
import { Preferences } from '../../models';
import { PageNavItems } from './page-settings-routes';
import { NavigationBar } from '../../components/navigationbar';

export const PageElement = () => {
  const preference = Preferences.useData();
  const prefProcessing = Preferences.useProcessing();

  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  // useEffect(() => {
  //   preference.get().then(result => {
  //     console.log('result', result);
  //     if (result.error) {
  //       console.error(result);
  //     }
  //   });
  // }, [preference]);

  const handleSave = () => {
    Preferences.save(preference);
  };

  const navLinks = [
    {
      to: Pages.Theme.route,
      label: 'Theme',
    },
    {
      to: Pages.Advanced.route,
      label: 'Advanced',
    },
  ];

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <div className={styles.settingsHeaderContainerr}>Preferences</div>

      <div className={styles.settings}>
        <nav className={styles.settingsLeftPane}>
          {navLinks.map(({ to, label }, index) => (
            <Link
              key={index}
              to={to}
              className={
                styles.settingsNavLink +
                `${index == activeRouteIndex ? ' active' : ''}`
              }
              onClick={() => setActiveRouteIndex(index)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.settingsRightPane}>
          <div className={styles.settingsContent}>
            <Routes>
              <Route
                path={Pages.Theme.route}
                element={<Pages.Theme.Element />}
              />
              <Route
                path={Pages.Advanced.route}
                element={<Pages.Advanced.Element />}
              />
              <Route path="*" element={<Pages.Theme.Element />} />
            </Routes>
          </div>
          <div className={styles.settingsSaveButtonContainer}>
            <button onClick={() => handleSave()}>
              {prefProcessing ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default {
  PageElement,
};
