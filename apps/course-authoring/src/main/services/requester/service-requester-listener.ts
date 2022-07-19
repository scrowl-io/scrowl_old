import { ipcMain } from 'electron';
import { RegisterEvent } from './service-requester-types';

export const register = (event: RegisterEvent) => {
  if (!event.fn || typeof event.fn !== 'function') {
    return;
  }

  switch (event.type) {
    case 'invoke':
      ipcMain.handle(event.name, event.fn);
      break;
    case 'on':
      ipcMain.on(event.name, event.fn);
      break;
    default:
      console.log(
        `Event type: ${event.type} not found. IPC event: ${event.name} has not been registered. `
      );
      break;
  }
};

export const registerAll = (events: Array<RegisterEvent>) => {
  events.forEach(register);
};

export default {
  register,
  registerAll,
};
