import { MenuItemConstructorOptions, IpcMainInvokeEvent } from 'electron';
import { send } from '../../requester';
import { MenuEvents, MenuItems } from '../service-menu.types';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const ITEMS: MenuItems = {
  about: {
    id: 'about',
    event: 'menu/about'
  },
  preferences: {
    id: 'preferences',
    event: 'menu/preferences'
  }
};

const aboutHandler = (event: IpcMainInvokeEvent) => {
  console.log('Open about Scrowl window...');
};

const preferencesHandler = (event: IpcMainInvokeEvent) => {
  console.log('Open preferences window...');
};

export const events:MenuEvents = [
  {
    name: ITEMS.about.event,
    type: 'on',
    fn: aboutHandler
  },
  {
    name: ITEMS.preferences.event,
    type: 'on',
    fn: preferencesHandler
  },
];

export const template: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'About Scrowl',
      id:  ITEMS.about.id,
      click: send(ITEMS.about.event),
    },
    separator,
    {
      label: 'Preferences…',
      id: ITEMS.preferences.id,
      click: send(ITEMS.preferences.event),
      accelerator: 'CmdOrCtrl+,',
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
