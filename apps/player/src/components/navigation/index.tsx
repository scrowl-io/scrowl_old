import React from 'react';
import { navigationdrawer } from '@owlui/lib';
import { NavigationDrawerElementProps } from '@owlui/navigationdrawer/src/Default/Default.types';
import * as styles from './nav.module.scss';

const NavDrawer = navigationdrawer.Default;

export const Element = (props: NavigationDrawerElementProps) => {
  return (
    <NavDrawer className={styles.owluiNavigationDrawer} items={props.items} />
  );
};

export default {
  Element,
};
