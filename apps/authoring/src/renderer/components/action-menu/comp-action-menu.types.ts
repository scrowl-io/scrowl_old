import React from 'react';
import { IconType, DropdownDefaultCommons } from '@owlui/lib';

export type ActionMenuItem = {
  label: string;
  icon: IconType;
  iconStyle: 'Filled' | 'Outlined';
  action?: (e: React.MouseEvent) => void;
};

export interface ActionMenuCommons
  extends Omit<DropdownDefaultCommons, 'items'> {
  title: string;
  children: React.ReactNode;
  'menu-items'?: Array<ActionMenuItem>;
}

export type ActionMenuProps = ActionMenuCommons;
