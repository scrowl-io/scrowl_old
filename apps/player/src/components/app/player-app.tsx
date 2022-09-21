import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import * as styles from './player-app.module.scss';
import { Manifest } from '../../models';
import { Error } from '../';
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

  return (
    <Router>
      <div className={styles.app}>
        <main className={styles.appMain}>
          <Routes manifest={manifest} />
        </main>
      </div>
    </Router>
  );
};

export default {
  App,
};
