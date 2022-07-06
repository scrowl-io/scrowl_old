import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit } from '../menu-event';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const menuFile: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: 'new-project',
      click: menuEventEmit('menu-project-create'),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Save',
      id: 'save-project',
      click: menuEventEmit('menu-project-save'),
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: 'save-as-project',
      click: menuEventEmit('menu-project-create'),
      accelerator: 'CmdOrCtrl+Shift+S',
    },
  ],
};
