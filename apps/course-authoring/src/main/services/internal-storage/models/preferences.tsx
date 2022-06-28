import { ipcMain } from 'electron';
import { default as PreferencesHandler } from '../handlers/preferences';
import { Preferences } from '../handlers/preferences/index.types';

export const events = {
  getPreferencesList: 'get-preferences-list',
  getPreference: 'get-preference',
  setPreferences: 'set-preferences',
};

export const getPreferencesList = () => {
  return PreferencesHandler.getPreferencesList();
};

export const getPreference = (
  event: Electron.IpcMainInvokeEvent,
  args: keyof Preferences
) => {
  return PreferencesHandler.getPreference(args);
};

export const setPreferences = (
  event: Electron.IpcMainInvokeEvent,
  args: Preferences
) => {
  return PreferencesHandler.setPreferences(args);
};

export const init = () => {
  ipcMain.handle(events.getPreferencesList, getPreferencesList);
  ipcMain.handle(events.getPreference, (event, args) =>
    getPreference(event, args)
  );
  ipcMain.handle(events.setPreferences, (event, args) =>
    setPreferences(event, args)
  );
};

export default {
  events,
  getPreferencesList,
  getPreference,
  setPreferences,
  init,
};
