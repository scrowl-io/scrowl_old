import { BrowserWindow } from 'electron';
import { ClickHandler } from './service-requester-types';
import { MenuItemEvents } from '../menu/service-menu-types';

export function send(
  name: MenuItemEvents,
  ...args: unknown[]
): ClickHandler {
  return (_, focusedWindow) => {
    // focusedWindow can be null if the menu item is clicked without the window
    // being in focus, for example clicking on a menu item while in devtools.
    // Since desktop only supports one window at a time we can assume
    // that the first BrowserWindow we find is the one we want.
    const window = focusedWindow ?? BrowserWindow.getAllWindows()[0];

    if (window !== undefined) {
      window.webContents.send(name, ...args);
    }
  };
}

export default {
  send,
};
