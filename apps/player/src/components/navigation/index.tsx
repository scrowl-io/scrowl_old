import React from 'react';
import { Default as NavDrawer } from '@owlui/navigationdrawer';

export const Element = () => {
  const navItems = [{ label: 'Lesson 1' }, { label: 'Lesson 2' }];
  return <NavDrawer items={navItems} />;
};

export default {
  Element,
};
