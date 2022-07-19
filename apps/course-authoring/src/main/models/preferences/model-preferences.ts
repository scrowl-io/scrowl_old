import { Model } from '../model.types';
import { PreferenceData, PreferenceEvents } from './model-preferences.types';
import {
  InternalStorage as IS,
  Requester,
} from '../../services';

const TABLE_NAME = 'preferences';

export const get = async (preference?: string) => {
  const res = await IS.get(TABLE_NAME, preference);

  return res[0];
};

export const set = (data: PreferenceData) => {
  return IS.set(TABLE_NAME, data);
};

const handlerGetPreference = (
  event: Electron.IpcMainInvokeEvent,
  preferenceName?: keyof PreferenceData
) => {

  if (typeof preferenceName === 'number') {
    return;
  }

  return get(preferenceName);
}

const handlerSetPreference = (
  event: Electron.IpcMainInvokeEvent,
  data: PreferenceData,
) => {
  return set(data);
}

export const EVENTS:PreferenceEvents = [
  {
    name: 'preferences/get',
    type: 'handle',
    fn: handlerGetPreference,
  },
  {
    name: 'preferences/get/preference',
    type: 'handle',
    fn: handlerGetPreference,
  },
  {
    name: 'preferences/set',
    type: 'handle',
    fn: handlerSetPreference,
  },
];

export const init = () => {
  Requester.registerAll(EVENTS);
}

export const Preferences: Model = {
  EVENTS,
  init,
  get,
  set,
};

export default Preferences;
