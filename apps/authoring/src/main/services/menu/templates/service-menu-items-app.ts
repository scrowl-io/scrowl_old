import { MenuItemConstructorOptions } from 'electron';
import { send, registerAll } from '../../requester';
import { MenuItemEventsApp } from '../service-menu.types';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const EVENTS: MenuItemEventsApp = {
  aboutOpen: {
    id: 'about-open',
    name: 'menu/about/open',
    type: 'send',
  },
  preferencesOpen: {
    id: 'preferences-open',
    name: 'menu/preferences/open',
    type: 'send',
  },
};

export const template: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'About Scrowl',
      id: EVENTS.aboutOpen.id,
      click: () => {
        send(EVENTS.aboutOpen.name);
      },
    },
    separator,
    {
      label: 'Preferences…',
      id: EVENTS.preferencesOpen.id,
      click: () => {
        send(EVENTS.preferencesOpen.name);
      },
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

export const init = () => {
  registerAll(EVENTS);
};

export default {
  EVENTS,
  init,
  template,
};
