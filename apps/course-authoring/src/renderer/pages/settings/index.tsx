import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@owlui/lib';
import {
  PreferenceData,
  PreferenceAppearance,
} from '../../../main/models/preferences';

export const PageRoute = '/settings';
export const PageName = 'Settings';

export const PageElement = () => {
  const [preferences, setPreferences] = useState<PreferenceData>();

  useEffect(() => {
    window.electronAPI.ipcRenderer.invoke('get-preferences-list').then(data => {
      setPreferences(data);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ appearance: event.target.value as PreferenceAppearance });
  };

  const handleSave = () => {
    window.electronAPI.ipcRenderer.invoke('set-preferences', {
      appearance: preferences?.appearance,
    });
  };

  const RadioButton = ({
    label,
    value,
    checked,
    onChange,
  }: {
    label: string;
    value: PreferenceAppearance;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
    );
  };

  return (
    <>
      <main>
        <section style={{ padding: '1rem' }}>
          <h1>Settings</h1>
          <h2>Appearance</h2>
          <fieldset>
            <legend>Change the appearance of Scrowl's workspace:</legend>
            <RadioButton
              label="Light"
              value="light"
              checked={preferences?.appearance === 'light'}
              onChange={handleChange}
            />
            <RadioButton
              label="Dark"
              value="dark"
              checked={preferences?.appearance === 'dark'}
              onChange={handleChange}
            />
          </fieldset>
          <div>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="link">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default {
  PageName,
  PageRoute,
  PageElement,
};
