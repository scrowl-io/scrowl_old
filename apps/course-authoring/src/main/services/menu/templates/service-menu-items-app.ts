import { MenuItemConstructorOptions, IpcMainInvokeEvent } from 'electron';
import { send, registerAll } from '../../requester';
import { MenuItemEventsApp } from '../service-menu.types';

const separator: MenuItemConstructorOptions = { type: 'separator' };

const aboutHandler = (event: IpcMainInvokeEvent) => {
  console.log('Open about Scrowl window...');
};

const preferencesHandler = (event: IpcMainInvokeEvent) => {
  console.log('Open preferences window...');
};

export const EVENTS: MenuItemEventsApp = {
  aboutOpen: {
    id: 'about-open',
    name: 'menu/about/open',
    type: 'on',
    fn: aboutHandler,
  },
  preferencesOpen: {
    id: 'preferences-open',
    name: 'menu/preferences/open',
    type: 'on',
    fn: preferencesHandler,
  }
};

export const template: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'About Scrowl',
      id:  EVENTS.aboutOpen.id,
      click: () => {
        send(EVENTS.aboutOpen.name)
      },
    },
    separator,
    {
      label: 'Preferences…',
      id: EVENTS.preferencesOpen.id,
      click: () => {
        send(EVENTS.preferencesOpen.name)
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
