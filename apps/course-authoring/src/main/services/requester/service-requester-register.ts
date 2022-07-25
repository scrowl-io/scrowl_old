import { ipcMain } from 'electron';
import {
  RegisterEvent,
  RegisterEvents,
  ApiResult,
} from './service-requester.types';

const EVENTS: Array<RegisterEvent> = [];

export const register = (event: RegisterEvent) => {
  if (!event.name) {
    console.error(`Unable to register event - event requires a name`);
    return;
  }

  switch (event.type) {
    case 'invoke':
      if (!event.fn || typeof event.fn !== 'function') {
        console.error(
          `Unable to register event: ${event.name} - ${event.type} requires a callback function`
        );
        return;
      }

      EVENTS.push(event);
      ipcMain.handle(event.name, event.fn);
      break;
    case 'on':
      if (!event.fn || typeof event.fn !== 'function') {
        console.error(
          `Unable to register event: ${event.name} - ${event.type} requires a callback function`
        );
        return;
      }

      EVENTS.push(event);
      ipcMain.on(event.name, event.fn);
      break;
    case 'send':
      EVENTS.push(event);
      break;
    default:
      console.log(
        `Event type: ${event.type} not found. IPC event: ${event.name} has not been registered. `
      );
      break;
  }
};

export const registerAll = (events: RegisterEvents) => {
  for (const key in events) {
    register(events[key]);
  }
};

export const init = () => {
  register({
    name: 'events-all',
    type: 'invoke',
    fn: () => {
      return new Promise<ApiResult>(resolve => {
        resolve({
          error: false,
          data: {
            events: JSON.parse(JSON.stringify(EVENTS)),
          },
        });
      });
    },
  });
};

export default {
  register,
  registerAll,
};
