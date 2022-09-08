import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Button, Icon } from '@owlui/lib';
import * as styles from './page-settings.module.scss';
import * as Pages from './pages';
import { Preferences } from '../../models';
import { Logo } from '../../components/logo';

export const PageElement = () => {
  const preference = Preferences.useData();
  const prefProcessing = Preferences.useProcessing();
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(-1);
  };

  const handleSave = () => {
    Preferences.save(preference);
  };

  return (
    <main className={styles.settings}>
      <div className={styles.settings__container}>
        <Button onClick={handlePrevPage} variant="link" className="mb-3">
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
