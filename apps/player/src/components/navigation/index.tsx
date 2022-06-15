import React from 'react';
import { Default as NavDrawer } from '@owlui/navigationdrawer';
import { NavigationDrawerElementProps } from '@owlui/navigationdrawer/src/Default/Default.types';

export const Element = (props: NavigationDrawerElementProps) => {
  return <NavDrawer items={props.items} />;
};

export default {
  Element,
};
