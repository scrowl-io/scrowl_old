import { Model } from '../model.types';
import { PreferenceData, PreferenceEvents } from './model-preferences.types';
import { InternalStorage as IS, Requester, System } from '../../services';
import * as table from './model-preferences-schema';
import { dialog } from 'electron';
import { resolve } from 'path';

export const create = (ev: Requester.RequestEvent, returnOnly = false) => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      System.getSystemTheme().then(sysRes => {
        if (sysRes.error) {
          resolve(sysRes);
          return;
        }
        const { theme } = sysRes.data;
        let preference: PreferenceData = {
          theme,
        };

        IS.create(table.name, preference).then(createRes => {
          if (createRes.error) {
            resolve(createRes);
            return;
          }

          preference = createRes.data.item;
          const result = {
            error: false as const,
            data: {
              preference,
            },
          };

          resolve(result);

          if (!returnOnly) {
            Requester.send(EVENTS.onCreate.name, result);
          }
        });
      });
    } catch (e) {
      const result = {
        error: true,
        message: 'Failed to create preferences',
        data: {
          trace: e,
        },
      };

      resolve(result);

      if (!returnOnly) {
        Requester.send(EVENTS.onCreate.name, result);
      }
    }
  });
};

export const get = (ev: Requester.RequestEvent) => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      IS.read(table.name).then(result => {
        if (result.error) {
          resolve(result);
          return;
        }

        if (result.data.items.length === 0) {
          create(ev, true).then(resolve);
          return;
        }

        resolve({
          error: false,
          data: {
            preference: result.data.items[0],
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

export const save = (
  ev: Requester.RequestEvent,
  preferences: PreferenceData
) => {
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

export const systemUpdate = (
  ev: Requester.RequestEvent,
  preferences: PreferenceData
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!preferences || !preferences.projectPathDialog) {
      resolve({
        error: true,
        message: 'Unable to save preference: id required',
      });
      return;
    }

    dialog
      .showOpenDialog({
        properties: ['openFile', 'openDirectory'],
      })
      .then(result => {
        console.log(result.canceled);
        console.log(result.filePaths);
      })
      .catch(err => {
        console.log(err);
      });
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
  systemUpdate: {
    name: '/preferences/systemUpdate',
    type: 'invoke',
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
