import React from 'react';
import { DropdownDefaultCommons, IconsDefaultProps } from '@owlui/lib';

export type ActionMenuItem = IconsDefaultProps & {
  label: string;
  actionHandler?: (ev: React.MouseEvent<Element, MouseEvent>) => void;
};

export interface ActionMenuCommons
  extends Omit<DropdownDefaultCommons, 'items'> {
  title: string;
  children: React.ReactNode;
  'menu-items'?: Array<ActionMenuItem>;
}

export type ActionMenuProps = ActionMenuCommons;
