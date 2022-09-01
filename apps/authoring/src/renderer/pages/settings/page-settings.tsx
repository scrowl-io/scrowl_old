import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import { Button, Icon } from '@owlui/lib';
import * as styles from './page-settings.module.scss';
import * as Pages from './pages';
import { Preferences } from '../../models';
import { Logo } from '../../components/logo';

export const PageElement = () => {
  const preference = Preferences.useData();
  const prefProcessing = Preferences.useProcessing();

  const handleSave = () => {
    Preferences.save(preference);
  };

  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        {/* TODO: Make this go back to the last non-settings page you came from */}
        <Button variant="link" href="/" className="mb-3">
          <Icon icon="arrow_back" />
          Back
        </Button>
        <div className={styles.settings__header}>
          <h1>
            <Logo href="/home/*" />
            Settings
          </h1>
        </div>
        <Tabs defaultActiveKey="theme">
          <Tab eventKey="theme" title="Theme">
            <Pages.Theme.Element />
          </Tab>
          <Tab eventKey="advanced" title="Advanced">
            <Pages.Advanced.Element />
          </Tab>
        </Tabs>

        <div>
          <Button variant="success" onClick={() => handleSave()}>
            {prefProcessing ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default {
  PageElement,
};
