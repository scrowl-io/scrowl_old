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
  type: Requester.RegisterEventType
) => {
  const eventList: Array<string> = [];

  for (let i = 0, ii = models.length; i < ii; i++) {

    if (!models[i].EVENTS || !models[i].EVENTS.length) {
      continue;
    }

    for (let j = 0, jj = models[i].EVENTS.length; j < jj; j++) {

      if (models[i].EVENTS[j].type === type) {
        eventList.push(models[i].EVENTS[j].name);
      }
    }
  }

  return eventList;
};

export default {
  init,
  getEvents,
};