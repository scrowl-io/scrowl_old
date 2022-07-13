import { BrowserWindow, IpcMainInvokeEvent, Menu } from 'electron';
import { ClickHandler, MenuEvent, MenuIpcEvents } from './types';

export const MENU_IPC_EVENTS: MenuIpcEvents = {
  newProject: 'menu/new-project',
  saveProject: 'menu/save-project',
  toggleItem: 'menu/toggle-item',
};

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

export const toggleEnableItemById = (
  event: IpcMainInvokeEvent,
  menuItemId: string
) => {
  const applicationMenu = Menu.getApplicationMenu();
  const disabledMenu = applicationMenu?.getMenuItemById(menuItemId);

  if (disabledMenu) disabledMenu.enabled = !disabledMenu.enabled;
};

export default {
  MENU_IPC_EVENTS,
};
