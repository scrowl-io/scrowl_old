import React from 'react';
import { Preferences } from '../../../../models';

export const route = 'advanced';

export const Element = () => {
  const preference = Preferences.useData();

  console.log('advanced prefs', preference);

  const handleChangeTheme = () => {
    const theme = preference.theme === 'default' ? 'dark' : 'default';

    Preferences.update({ theme });
  };

  return (
    <div>
      <p>This is the advanced preferences page</p>
      <button onClick={handleChangeTheme}>
        Change Theme {preference.theme}
      </button>
    </div>
  );
};

export default {
  route,
  Element,
};
