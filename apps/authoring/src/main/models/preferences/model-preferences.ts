import { Model } from '../model.types';
import { PreferenceData, PreferenceEvents } from './model-preferences.types';
import { InternalStorage as IS, Requester, System } from '../../services';

// const TABLE_NAME = 'preferences';

export const get = (preference?: string) => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      IS.get(TABLE_NAME, preference).then(result => {
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
          preference,
        },
      });
    }
  });
};

export const set = (data: PreferenceData) => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      IS.set(TABLE_NAME, data).then(result => {
        resolve({
          error: false,
          data: {
            preference: result,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to set preference',
        data: {
          trace: e,
          data,
        },
      });
    }
  });
};

const handlerGetPreference = (
  event: Electron.IpcMainInvokeEvent,
  preferenceName?: keyof PreferenceData
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (typeof preferenceName === 'number') {
      resolve({
        error: true,
        message: `Unable to get preference: ${preferenceName} - lookup type not supported`,
      });
      return;
    }

    try {
      if (!preferenceName) {
        get.then(resolve);
      }
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to get preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

const handlerSetPreference = (
  event: Electron.IpcMainInvokeEvent,
  data: PreferenceData
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    console.log('should show up on save', data);
    set(data).then(resolve);
  });
};

export const EVENTS: PreferenceEvents = {
  list: {
    name: 'preferences/get',
    type: 'invoke',
    fn: handlerGetPreference,
  },
  get: {
    name: 'preferences/get/preference',
    type: 'invoke',
    fn: handlerGetPreference,
  },
  set: {
    name: 'preferences/set',
    type: 'invoke',
    fn: handlerSetPreference,
  },
};

export const init = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      Requester.registerAll(EVENTS);
      resolve({
        error: false,
        data: {
          table: '',
        },
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to initalize preferences',
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
};

export default Preferences;
