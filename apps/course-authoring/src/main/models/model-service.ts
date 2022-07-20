import { Requester } from '../services';
import * as Project from './project';
import * as Preferences from './preferences';

const models = [Preferences, Project];

export const init = () => {
  models.forEach(model => {
    model.init();
  });
};

export default {
  init,
};