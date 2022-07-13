export type MenuEvent =
  | 'menu/new-project'
  | 'menu/save-project'
  | 'menu/toggle-item';

export interface MenuIpcEvents {
  [key: string]: MenuEvent;
}

export type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;
