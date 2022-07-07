import { BrowserWindow } from 'electron';

export type MenuEvent = 'menu:toggle-enable' | 'menu:new-project' | 'menu:save';

type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;

export function menuEventEmit(
  name: MenuEvent,
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
