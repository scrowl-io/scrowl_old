import { IconType, DropdownDefaultCommons } from '@owlui/lib';

export type ActionMenuItem = {
  label: string;
  icon: IconType;
  iconStyle: 'Filled' | 'Outlined';
  action?: (e: React.MouseEvent) => void;
};

export interface ActionMenuCommons {
  menuItems: Array<ActionMenuItem>;
}

export interface ActionMenuProps extends Omit<DropdownDefaultCommons, 'items'> {
  title: string;
  children: React.ReactNode;
  'menu-items'?: Array<ActionMenuItem>;
}
