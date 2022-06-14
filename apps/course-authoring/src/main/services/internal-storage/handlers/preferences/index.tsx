import database from '../../database';
import { Preferences } from './index.types';

const table = 'preferences';

const getPreferencesList = async () => {
  const data = await database.select().from(table);
  return data[0];
};

const getPreference = async (column: keyof Preferences) => {
  const data = await database.select(column).from(table);
  return data[0];
};

const setPreferences = (args: unknown) => {
  return database(table).update(args);
};

export default {
  getPreferencesList,
  getPreference,
  setPreferences,
};
