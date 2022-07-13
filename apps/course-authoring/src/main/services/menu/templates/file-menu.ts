import { MenuItemConstructorOptions } from 'electron';
import { menuEventEmit, MENU_IPC_EVENTS } from '../events';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const menuIds = {
  newProject: 'new-project',
  saveProject: 'save-project',
  saveProjectAs: 'save-project-as',
};

export const menuFile: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: menuIds.newProject,
      click: menuEventEmit(MENU_IPC_EVENTS.newProject),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Save',
      id: menuIds.saveProject,
      click: menuEventEmit(MENU_IPC_EVENTS.saveProject, false),
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: menuIds.saveProjectAs,
      click: menuEventEmit(MENU_IPC_EVENTS.saveProject, true),
      accelerator: 'CmdOrCtrl+Shift+S',
    },
  ],
};
