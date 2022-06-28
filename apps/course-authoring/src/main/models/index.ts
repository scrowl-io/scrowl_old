import { ipcMain } from 'electron';
import * as projects from './project/project-model';

type ModelEventProps = {
  name: string;
  fn: string;
};

interface ModelProps {
  EVENTS: Array<ModelEventProps>;
  [key: string]: any;
}

const models = [projects];

const registerEvents = (model: ModelProps) => {
  model.EVENTS.forEach((ev: ModelEventProps) => {
    if (model[ev.fn]) {
      ipcMain.handle(ev.name, model[ev.fn]);
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
