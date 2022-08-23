import React from 'react';
import { SubPageProps } from '../../page-settings.types';

export const route = 'theme';

export const Element = (props: SubPageProps) => {
  console.log('theme prefs', props.preferences);
  return <div>This is the theme preferences page</div>;
};

export default {
  route,
  Element,
};
