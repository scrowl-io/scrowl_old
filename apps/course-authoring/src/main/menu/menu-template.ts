import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit } from './menu-event';
import { menuFile } from './file';

const DARWIN = process.platform === 'darwin';
const separator: MenuItemConstructorOptions = { type: 'separator' };
const template: MenuItemConstructorOptions[] = [];

export const buildDefaultMenu = (): MenuItemConstructorOptions[] => {
  if (DARWIN) {
    template.push({
      label: 'Scrowl',
      submenu: [
        {
          label: 'About Scrowl',
          click: () => menuEventEmit('menu-show-about'),
          id: 'about',
        },
        separator,
        {
          label: 'Preferences…',
          id: 'preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => menuEventEmit('menu-show-preferences'),
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
    });
  }

  template.push(menuFile);

  return template;
};
