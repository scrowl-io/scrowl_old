import * as project from './project';
import { Requester } from '../services';

const models = [project];

export const init = () => {
  models.forEach(model => {
    model.init();
  });
};

export const getEvents = (
  type: Requester.RegisterEventType
) => {
  const getEventNames = (ev: Requester.RegisterEvent) => {
    return ev.name;
  };

  return models
    .map(model => {
      return model.EVENTS
        ? model.EVENTS.filter(ev => ev.type === type).map(getEventNames)
        : [];
    })
    .flat();
};

export default {
  init,
  getEvents,
};