/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ActionMenuProps, ActionMenuItem } from './comp-action-menu.types';
import {
  Dropdown,
  DropdownItemProps,
  DropdownDefaultProps,
  Icon,
} from '@owlui/lib';

const ActionMenuBtn = (
  <Icon
    display="outlined"
    filled
    icon="more_vert"
    style={{ fontSize: '15px' }}
  />
);

const makeActionMenu = (
  items: Array<ActionMenuItem>
): Array<DropdownItemProps> => {
  return items.map(
    ({ actionHandler, label, ...props }: ActionMenuItem, idx: number) => {
      return {
        id: idx.toString(),
        label: (
          <div
            className="dropdown-item-wrapper left-pane-dropdown d-flex align-items-center"
            onClick={actionHandler}
          >
            <Icon {...props} />
            <span>{label}</span>
          </div>
        ),
      };
    }
  );
};

export const ActionMenu = (props: ActionMenuProps) => {
  if (!props['menu-items']) {
    console.error('Menu Items are a required prop for Action Menu');
    return <></>;
  }

  const actionMenu = makeActionMenu(props['menu-items']);

  const locals = props;
  delete locals['menu-items'];

  const dropdownProps: DropdownDefaultProps = Object.assign(
    {
      items: actionMenu,
      title: props.title,
      size: undefined,
      button: ActionMenuBtn,
    },
    locals
  );

  return <Dropdown {...dropdownProps}></Dropdown>;
};

export default {
  ActionMenu,
};
