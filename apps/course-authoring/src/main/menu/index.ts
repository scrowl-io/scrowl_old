import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { MenuEvent } from './menu-event';

const DARWIN = process.platform === 'darwin';

const buildDefaultMenu = () => {
  const template: MenuItemConstructorOptions[] = [];
  const separator: Electron.MenuItemConstructorOptions = { type: 'separator' };

  if (DARWIN) {
    template.push({
      label: 'Scrowl',
      submenu: [
        {
          label: 'About Scrowl',
          click: () => menuItemEmit('menu-show-about'),
          id: 'about',
        },
        separator,
        {
          label: 'Preferences…',
          id: 'preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => menuItemEmit('menu-show-preferences'),
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

  const fileMenu: MenuItemConstructorOptions = {
    label: 'File',
    submenu: [
      {
        label: 'New Project...',
        id: 'new-project',
        click: () => menuItemEmit('menu-project-create'),
        accelerator: 'CmdOrCtrl+N',
      },
      separator,
    ],
  };

  template.push(fileMenu);

  return template;
};

const menuItemEmit = (name: MenuEvent) => {
  const window = BrowserWindow.getAllWindows()[0];

  window.webContents.send(name);
};

export const init = () => {
  const menuTemplate = buildDefaultMenu();
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};
