import { Requester } from '../services';
import * as Project from './project';
import * as Preferences from './preferences';

const models = [Preferences, Project];

export const init = () => {
  models.forEach(model => {
    model.init();
  });
};

export const getEvents = (
  type?: Requester.RegisterEventType
) => {
  const eventList: Array<string> = [];

  for (let i = 0, ii = models.length; i < ii; i++) {

    if (!models[i].EVENTS) {
      continue;
    }

    for (const [key, event] of Object.entries(models[i].EVENTS)) {

      if (!type || event.type === type) {
        eventList.push(event.name);
      }
    }
  }

  return eventList;
};

export default {
  init,
  getEvents,
};