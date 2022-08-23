import { Model } from '../model.types';
import { PreferenceData, PreferenceEvents } from './model-preferences.types';
import { InternalStorage as IS, Requester, System } from '../../services';
import * as table from './model-preferences-schema';

export const create = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      System.getPreferences().then(sysRes => {
        if (sysRes.error) {
          resolve(sysRes);
          return;
        }
        const { theme } = sysRes.data;
        let preferences: PreferenceData = {
          theme,
        };

        IS.create(table.name, preferences).then(createRes => {
          if (createRes.error) {
            resolve(createRes);
            return;
          }

          preferences = createRes.data.item;
          const result = {
            error: false as const,
            data: {
              preferences,
            },
          };
          resolve(result);
          Requester.send(EVENTS.onCreate.name, result);
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const get = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      IS.read(table.name).then(result => {
        if (!result.length) {
          create().then(resolve);
          return;
        }

        resolve({
          error: false,
          data: {
            preference: result[0],
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to get preference',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const save = (preferences: PreferenceData) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!preferences || !preferences.id) {
      resolve({
        error: true,
        message: 'Unable to save preference: id required',
      });
      return;
    }

    try {
      IS.update(table.name, preferences, { id: preferences.id }).then(
        updateRes => {
          if (updateRes.error) {
            resolve(updateRes);
            return;
          }

          if (!updateRes.data.item) {
            resolve({
              error: true,
              message: 'Malformed save: project was not returned',
              data: updateRes,
            });
            return;
          }

          const updatedPreferences = updateRes.data.item;
          resolve({
            error: false,
            data: {
              preferences: updatedPreferences,
            },
          });
        }
      );
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to set preference',
        data: {
          trace: e,
          preferences,
        },
      });
    }
  });
};

export const open = () => {
  Requester.send(EVENTS.open.name);
};

export const EVENTS: PreferenceEvents = {
  create: {
    name: '/preferences/create',
    type: 'send',
  },
  onCreate: {
    name: '/preferences/create',
    type: 'invoke',
    fn: create,
  },
  get: {
    name: '/preferences',
    type: 'invoke',
    fn: get,
  },
  save: {
    name: '/preferences/save',
    type: 'invoke',
    fn: save,
  },
  open: {
    name: '/preferences/open',
    type: 'send',
  },
};

export const init = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      Requester.registerAll(EVENTS);
      IS.__tableCreate(table.name, table.schema).then(() => {
        resolve({
          error: false,
          data: {
            table: table.name,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to initialize preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const Preferences: Model = {
  EVENTS,
  init,
  create,
  get,
  save,
  open,
};

export default Preferences;
