import React from 'react';
import { Preferences } from '../../../../models';
import { api } from '../../../../models/preferences';

export const route = 'advanced';

export const Element = () => {
  const preference = Preferences.useData();

  console.log('advanced prefs', preference);

  const handleChangeTheme = () => {
    const theme = preference.theme === 'light' ? 'dark' : 'light';

    Preferences.update({ theme });
  };

  const handleSetProjectSavePath = () => {
    api.systemUpdate({ projectPathDialog: true });
  };

  return (
    <div>
      <p>This is the advanced preferences page</p>
      <button onClick={handleChangeTheme}>
        Change Theme {preference.theme}
      </button>
      <button onClick={handleSetProjectSavePath}>Project Path</button>
    </div>
  );
};

export default {
  route,
  Element,
};
