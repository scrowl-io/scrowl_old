import { ipcMain } from 'electron';
import database from '../../database';
import { Preferences } from './index.types';

const table = 'preference';

const getPreferencesList = async () => {
  const data = await database.select().from(table);
  return data[0];
};

const getPreference = async (
  event: Electron.IpcMainInvokeEvent,
  args: keyof Preferences
) => {
  const data = await database.select(args).from(table);
  return data[0];
};

const setPreferences = (event: Electron.IpcMainInvokeEvent, args: unknown) => {
  return database(table).update(args);
};

export const events = {
  getPreferencesList: 'get-preferences-list',
  getPreference: 'get-preference',
  setPreferences: 'set-preferences',
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
