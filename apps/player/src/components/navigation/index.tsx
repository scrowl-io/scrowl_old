import React from 'react';
import {
  NavigationDrawer as NavDrawer,
  NavigationDrawerElementProps,
} from '@owlui/lib';
import * as styles from './nav.module.scss';

export const Element = (props: NavigationDrawerElementProps) => {
  return (
    <NavDrawer className={styles.owluiNavigationDrawer} items={props.items} />
  );
};

export default {
  Element,
};
