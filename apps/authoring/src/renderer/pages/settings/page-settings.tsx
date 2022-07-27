import React from 'react';
import * as styles from './page-settings.module.scss';
import { PageNavItems } from './page-settings-routes';
import { NavigationBar } from '../../components/navigationbar';

export const PageElement = () => {
  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.settings}>
        <h1>Settings Page</h1>
      </main>
    </>
  );
};

export default {
  PageElement,
};
