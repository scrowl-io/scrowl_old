import React from 'react';
import { Preferences } from '../../../../models';
import * as styles from './page-settings-theme.module.scss';

export const route = 'theme';

const options = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

export const Element = () => {
  const preference = Preferences.useData();

  const handleChangeTheme = (value: any) => {
    Preferences.update({ theme: value });
  };

  return (
    <>
      <h3>Appearance</h3>
      <div className={styles.optionsContainer}>
        {options.map((option, index) => {
          return (
            <label key={index} className={styles.appearanceInput}>
              <input
                type="radio"
                value={option.value}
                checked={preference.theme === option.value}
                onChange={({ target }) => handleChangeTheme(target.value)}
              />
              <p>{option.label}</p>
            </label>
          );
        })}
      </div>
    </>
  );
};

export default {
  route,
  Element,
};
