import { ipcMain, IpcMainInvokeEvent } from 'electron';
import * as projects from './project/project-model';

export type ModelEventProps = {
  name: string;
  fn: HandleListenerProps;
};

type HandleListenerProps = (event: IpcMainInvokeEvent, ...args: any[]) => void;

interface ModelProps {
  EVENTS: ModelEventProps[];
  [key: string]: unknown;
}

const models = [projects];

const registerEvents = (model: ModelProps) => {
  model.EVENTS.forEach((ev: ModelEventProps) => {
    if (ev.fn && typeof ev.fn === 'function') {
      ipcMain.handle(ev.name, ev.fn);
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

export const getEvents = () => {
  const getEventNames = (ev: ModelEventProps) => {
    return ev.name;
  };

  return models
    .map(model => {
      return model.EVENTS ? model.EVENTS.map(getEventNames) : [];
    })
    .flat();
};

export default {
  init,
  getEvents,
};
