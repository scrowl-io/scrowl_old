import { ipcMain, IpcMainInvokeEvent } from 'electron';
import * as projects from './project/project-model';
import * as menu from '../services/menu';

export type ModelEventProps = {
  name: string;
  fn?: HandleListenerProps;
  type: 'send' | 'handle' | 'invoke' | 'on';
};

type HandleListenerProps = (event: IpcMainInvokeEvent, ...args: any[]) => void;

interface ModelProps {
  EVENTS: ModelEventProps[];
  [key: string]: unknown;
}

const EVENT_TYPES = {
  invoke: 'invoke',
  on: 'on',
};

const models = [projects, menu];

const registerEvents = (model: ModelProps) => {
  model.EVENTS.forEach((ev: ModelEventProps) => {
    if (!ev.fn || typeof ev.fn !== 'function') {
      return;
    }

    switch (ev.type) {
      case EVENT_TYPES.invoke:
        ipcMain.handle(ev.name, ev.fn);
        break;
      case EVENT_TYPES.on:
        ipcMain.on(ev.name, ev.fn);
        break;
      default:
        console.log(
          `Event type: ${ev.type} not found. IPC event: ${ev.name} has not been registered. `
        );
        break;
    }
  });
};

export const init = () => {
  models.forEach(model => {
    if (model.EVENTS) {
      registerEvents(model);
    }
  });
};

export const getEvents = (
  eventType: 'invoke' | 'on' | 'removeAllListeners'
) => {
  const getEventNames = (ev: ModelEventProps) => {
    return ev.name;
  };

  return models
    .map(model => {
      return model.EVENTS
        ? model.EVENTS.filter(ev => ev.type === eventType).map(getEventNames)
        : [];
    })
    .flat();
};

export default {
  init,
  getEvents,
};
