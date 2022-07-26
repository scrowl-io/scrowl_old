/* eslint-disable  @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from 'electron';

export type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent
) => void;

export type JsonArray = Array<any | JsonResult | JsonArray>;

export type JsonResult = {
  [key: string]: any | JsonResult | JsonArray;
};

export type EventCallback = (event: IpcMainInvokeEvent, ...args: any[]) => any;

export type RegisterEventType = 'send' | 'invoke' | 'on';

export interface RegisterEvent {
  name: string;
  type: RegisterEventType;
  fn?: EventCallback;
}

export interface RegisterEvents {
  [key: string]: RegisterEvent;
}

export interface ApiResultError extends JsonResult {
  error: true;
  message: string;
}

export interface ApiResultSuccess extends JsonResult {
  error: false;
  message?: string;
  data: JsonResult;
}

export type ApiResult = ApiResultError | ApiResultSuccess;
