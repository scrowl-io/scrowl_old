import React from 'react';
import { SubPageProps } from '../../page-settings.types';

export const route = 'advanced';

export const Element = (props: SubPageProps) => {
  console.log('advanced prefs', props.preferences);
  return <div>This is the advanced preferences page</div>;
};

export default {
  route,
  Element,
};
