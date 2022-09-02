import React from 'react';
import { Alert } from 'react-bootstrap';
import { Preferences } from '../../../../models';

export const route = 'advanced';

export const Element = () => {
  const preference = Preferences.useData();

  console.log('advanced prefs', preference);

  return (
    <div className="settings__section">
      <h2 className="h3">Advanced Prefererences</h2>
      <Alert variant="info">This is the advanced preferences page</Alert>
    </div>
  );
};

export default {
  route,
  Element,
};
