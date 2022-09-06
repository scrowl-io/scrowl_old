import { MenuItemConstructorOptions } from 'electron';
import { MenuItemEventsApp } from '../service-menu.types';
import { Preferences } from '../../../models';
import { send } from '../../requester';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const EVENTS: MenuItemEventsApp = {
  preferencesOpen: {
    id: 'preferences-open',
    name: '/preferences/open',
    type: 'send',
  },
  getStarted: {
    id: 'get-started',
    name: '/get-started',
    type: 'send',
  },
};

export const template: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'Preferences…',
      id: EVENTS.preferencesOpen.id,
      click: () => {
        Preferences.open();
      },
      accelerator: 'CmdOrCtrl+,',
    },
    {
      label: 'Get Started',
      id: EVENTS.getStarted.id,
      click: () => {
        send(EVENTS.getStarted.name);
      },
    },
    separator,
    {
      role: 'services',
      submenu: [],
    },
    separator,
    { role: 'hide' },
    { role: 'hideOthers' },
    { role: 'unhide' },
    separator,
    { role: 'quit' },
  ],
};

export default {
  template,
};
