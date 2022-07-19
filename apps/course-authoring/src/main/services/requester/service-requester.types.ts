import { IpcMainInvokeEvent } from 'electron';

export type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;

export type EventCallback = (event: IpcMainInvokeEvent, ...args: any[]) => any;

export type RegisterEventType = 'send' | 'handle' | 'invoke' | 'on';

export interface RegisterEvent {
  name: string;
  type: RegisterEventType;
  fn?: EventCallback;
}