import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit } from '../menu-event';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const menuFile: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: 'new-project',
      click: () => newProject(),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
  ],
};

const newProject = () => {
  try {
    menuEventEmit('menu-project-create');
  } catch (err) {
    console.log(err);
  }
};
