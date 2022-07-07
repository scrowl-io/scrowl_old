import { ipcMain, IpcMainInvokeEvent } from 'electron';
import * as projects from './project/project-model';
import * as menu from './menu/menu-models';

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

const models = [projects, menu];

const registerEvents = (model: ModelProps) => {
  model.EVENTS.forEach((ev: ModelEventProps) => {
    if (ev.fn && typeof ev.fn === 'function') {
      if (ev.type === 'invoke') {
        ipcMain.handle(ev.name, ev.fn);
      }

      if (ev.type === 'on') {
        ipcMain.on(ev.name, ev.fn);
      }
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
