import { ipcMain } from 'electron';
import { RegisterEvent, RegisterEvents } from './service-requester.types';

export const register = (event: RegisterEvent) => {
  if (!event.fn || typeof event.fn !== 'function') {
    return;
  }

  switch (event.type) {
    case 'invoke':
    case 'handle':
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

export const registerAll = (events: RegisterEvents) => {

  for (let key in events) {
    register(events[key]);
  }
};

export default {
  register,
  registerAll,
};
