import { BrowserWindow } from 'electron';
import { MenuItemEventNames } from '../menu/service-menu.types';

export function send(name: MenuItemEventNames, ...args: unknown[]) {
  const window = BrowserWindow.getAllWindows()[0];

  if (window !== undefined) {
    window.webContents.send(name, ...args);
  }
}

export default {
  send,
};
