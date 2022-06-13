import database from './database';
import { ipcMain } from 'electron';

const getPreferences = () => {
  return database.select('appearance').from('preferences');
};

export const EVENTS = {
  preferences: 'get-preferences',
};

export const init = () => {
  ipcMain.on(EVENTS.preferences, getPreferences);
};

export default { getPreferences, EVENTS };
