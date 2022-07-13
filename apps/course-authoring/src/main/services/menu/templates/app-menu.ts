import { MenuItemConstructorOptions } from 'electron';

const separator: MenuItemConstructorOptions = { type: 'separator' };

const menuIds = {
  preferences: 'preferences',
};

export const menuApp: MenuItemConstructorOptions = {
  label: 'Scrowl',
  submenu: [
    {
      label: 'About Scrowl',
      click: () => console.log('Open about Scrowl window...'),
      id: 'about',
    },
    separator,
    {
      label: 'Preferences…',
      id: menuIds.preferences,
      accelerator: 'CmdOrCtrl+,',
      click: () => console.log('Open preferences window...'),
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
