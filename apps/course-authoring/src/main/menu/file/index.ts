import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit } from '../menu-event';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const menuFile: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: 'new-project',
      click: () => menuEventEmit('menu-project-create'),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
  ],
};
