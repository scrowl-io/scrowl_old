import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Default as Btn } from '@owlui/button';
import style from './styles.module.scss';

export const PageRoute = '/settings';
export const PageName = 'Settings';

export const PageElement = () => {
  const [appearance, setAppearance] = useState('light');

  const handleSave = () => {
    console.log('Data persisted successfully');
  };

  const RadioButton = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: () => void;
  }) => {
    return (
      <div className="radio">
        <label>
          <input type="radio" checked={value} onChange={onChange} />
          {label}
        </label>
      </div>
    );
  };

  return (
    <>
      <main className={style.main}>
        <h1>Settings</h1>
        <h2>Appearance</h2>
        <fieldset>
          <legend>Change the appearance of Scrowl's workspace:</legend>
          <RadioButton
            label="Light"
            value={appearance === 'light'}
            onChange={() => setAppearance('light')}
          />
          <RadioButton
            label="Dark"
            value={appearance === 'dark'}
            onChange={() => setAppearance('dark')}
          />
        </fieldset>
        <div>
          <Btn variant="primary" onClick={handleSave}>
            Save
          </Btn>
          <Btn variant="link">
            <Link to="/">Back to Home</Link>
          </Btn>
        </div>
      </main>
    </>
  );
};

export default {
  PageName,
  PageRoute,
  PageElement,
};
