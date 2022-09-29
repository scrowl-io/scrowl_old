import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import * as styles from './player-app.module.scss';
import { AppProps } from './player-app.types';
import { Manifest } from '../../models';
import { Pages } from '../../services';
import { Error, Outline } from '../';
import { Routes } from './elements';

export const App = ({ templateList }: AppProps) => {
  const runtime = window.__SCROWL_RUNTIME;

  if (runtime) {
    const startRes = runtime.start();

    if (startRes.error) {
      // root.render(<Error msg={startRes.message} />);
      console.error(`starting error: ${startRes.message}`);
    }
  }

  const manifestRes = Manifest.get();

  if (manifestRes.error) {
    return <Error msg={manifestRes.message} />;
  }

  if (!manifestRes.data) {
    return <Error msg="Manifest does not have data" />;
  }

  let manifest = manifestRes.data;

  console.log('manifest', manifest.glossary);
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

  const createGlossaryDict = (terms: any) => {
    const dict: any = {};

    terms.forEach((item: any, idx: number) => {
      const heading = item.name.substring(0, 1).toUpperCase();

      if (dict[heading] === undefined) {
        dict[heading] = {};
      }

      dict[heading][item.name] = {
        idx,
        description: item.description,
      };
    });

    return dict;
  };

  const test = createGlossaryDict(manifest.glossary);

  return (
    <Router>
      <div className={styles.app}>
        <Outline config={pageConfig} glossary={manifest.glossary} />
        <main className={styles.appMain}>
          <Routes config={pageConfig} templateList={templateList} />
        </main>
      </div>
    </Router>
  );
};

export default {
  App,
};
