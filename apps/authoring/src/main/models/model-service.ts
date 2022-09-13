import * as Project from './projects';
import * as Preferences from './preferences';
import * as Templates from './templates';

const models = [Preferences, Project, Templates];

export const init = () => {
  const inits = models.map(model => {
    return model.init();
  });

  return Promise.allSettled(inits);
};

export default {
  init,
};
