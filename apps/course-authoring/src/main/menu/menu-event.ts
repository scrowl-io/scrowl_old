import { BrowserWindow } from 'electron';

export type MenuEvent =
  | 'menu-open-working-directory'
  | 'menu-project-create'
  | 'menu-project-save'
  | 'menu-project-import'
  | 'menu-show-preferences'
  | 'menu-show-about';

export const menuEventEmit = (name: MenuEvent) => {
  const window = BrowserWindow.getAllWindows()[0];
  window.webContents.send(name);
};
