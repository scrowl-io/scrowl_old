import { BrowserWindow } from 'electron';

export type MenuEvent =
  | 'menu-toggle-enable-item-by-id'
  | 'menu-open-working-directory'
  | 'menu-project-create'
  | 'menu-project-save'
  | 'menu-project-import'
  | 'menu-show-preferences'
  | 'menu-show-about';

export const menuEventEmit = (name: MenuEvent, ...args: unknown[]) => {
  const window = BrowserWindow.getAllWindows()[0];

  window.webContents.send(name, ...args);
};
