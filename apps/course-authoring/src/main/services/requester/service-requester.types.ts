import { IpcMainInvokeEvent } from 'electron';

export type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;

export type EventCallback = (event: IpcMainInvokeEvent, ...args: any[]) => any;

export type RegisterEventType = 'send' | 'invoke' | 'on';

export interface RegisterEvent {
  name: string;
  type: RegisterEventType;
  fn?: EventCallback;
}

export interface RegisterEvents {
  [key: string]: RegisterEvent
}

export interface ApiResultError {
  error: true;
  message: string;
  [key: string]: any;
}

export interface ApiResultSuccess {
  error: false;
  message?: string;
  data: {
    [key: string]: any;  
  }
  [key: string]: any;
}

export type ApiResult = ApiResultError | ApiResultSuccess;