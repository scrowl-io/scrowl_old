import React from 'react';
import { Form } from 'react-bootstrap';
import { Preferences } from '../../../../models';

export const route = 'theme';

export const Element = () => {
  const preference = Preferences.useData();

  const handleChangeTheme = () => {
    const theme = preference.theme === 'default' ? 'dark' : 'default';

    Preferences.update({ theme });
  };

  return (
    <div className="settings__section">
      <h2 className="h3">Theme Preferences</h2>
      <Form>
        <Form.Label htmlFor="themeSelector">Editor Theme</Form.Label>
        <br />
        <Form.Check
          inline
          label="Default"
          name="themeSelector"
          type="radio"
          id="themeSelectorDefault"
          onChange={handleChangeTheme}
          checked={preference.theme === 'default'}
        />
        <Form.Check
          inline
          label="Dark"
          name="themeSelector"
          type="radio"
          id="themeSelectorDark"
          onChange={handleChangeTheme}
          checked={preference.theme === 'dark'}
        />
      </Form>
    </div>
  );
};

export default {
  route,
  Element,
};
