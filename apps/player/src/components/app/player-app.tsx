import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import * as styles from './player-app.module.scss';
import { Manifest, Pages } from '../../models';
import { Error, Outline } from '../';
import { Routes } from './elements';

export const App = () => {
  const manifestRes = Manifest.get();

  if (manifestRes.error) {
    return <Error msg={manifestRes.message} />;
  }

  if (!manifestRes.data) {
    return <Error msg="Manifest does not have data" />;
  }

  let manifest = manifestRes.data;

  if (typeof manifest === 'string') {
    manifest = JSON.parse(manifest);
  }

  const pageRes = Pages.getPages(manifest);

  if (pageRes.error) {
    return <Error msg={pageRes.message} />;
  }

  if (!pageRes.data || !pageRes.data.length) {
    return <Error msg="Project has no pages" />;
  }

  const pageConfig = pageRes.data;

  return (
    <Router>
      <div className={styles.app}>
        <Outline config={pageConfig} />
        <main className={styles.appMain}>
          <Routes config={pageConfig} />
        </main>
      </div>
    </Router>
  );
};

export default {
  App,
};
