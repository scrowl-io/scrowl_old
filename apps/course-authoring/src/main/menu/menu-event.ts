import { BrowserWindow } from 'electron';

export type MenuEvent =
  | 'menu-toggle-enable-item-by-id'
  | 'menu-open-working-directory'
  | 'menu-project-create'
  | 'menu-project-save'
  | 'menu-project-import'
  | 'menu-show-preferences'
  | 'menu-show-about';

type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;

// export const menuEventEmit = (
//   name: MenuEvent,
//   ...args: unknown[]
// ): ClickHandler => {
//   const window = BrowserWindow.getAllWindows()[0];

//   window.webContents.send(name, ...args);
// };

export function menuEventEmit(
  name: MenuEvent,
  ...args: unknown[]
): ClickHandler {
  return (_, focusedWindow) => {
    // focusedWindow can be null if the menu item was clicked without the window
    // being in focus. A simple way to reproduce this is to click on a menu item
    // while in DevTools. Since Desktop only supports one window at a time we
    // can be fairly certain that the first BrowserWindow we find is the one we
    // want.
    const window = focusedWindow ?? BrowserWindow.getAllWindows()[0];
    if (window !== undefined) {
      window.webContents.send(name, ...args);
    }
  };
}
