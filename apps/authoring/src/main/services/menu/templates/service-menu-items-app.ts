import { MenuItemConstructorOptions } from 'electron';
import { Preferences } from '../../../models';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const template: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'Preferences…',
      id: 'preferences-open',
      click: () => {
        Preferences.open();
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

export default {
  template,
};
