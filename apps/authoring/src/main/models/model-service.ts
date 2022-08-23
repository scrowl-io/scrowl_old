import * as Project from './projects';
import * as Preferences from './preferences';

const models = [Preferences, Project];

export const init = () => {
  const inits = models.map(model => {
    return model.init();
  });

  return Promise.allSettled(inits);
};

export default {
  init,
};
