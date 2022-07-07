import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit } from '../menu-event';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const menuFile: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: 'new-project',
      click: menuEventEmit('menu:new-project'),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Save',
      id: 'save-project',
      click: menuEventEmit('menu:save', false),
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: 'save-project-as',
      click: menuEventEmit('menu:save', true),
      accelerator: 'CmdOrCtrl+Shift+S',
    },
  ],
};
