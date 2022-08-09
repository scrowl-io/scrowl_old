import knex from 'knex';
import path from 'path';
import { DatabaseData } from './service-is.types';

const DB = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './scrowl.sqlite'),
  },
  useNullAsDefault: true,
});

export const get = (tableName: string, column?: string) => {
  if (column) {
    return DB.select(column).from(tableName);
  }

  return DB.select().from(tableName);
};

export const set = (tableName: string, data: DatabaseData) => {
  return DB(tableName).update(data);
};

export const insert = (tableName: string, data: DatabaseData) => {
  return DB(tableName).insert(data);
};

export default {
  get,
  set,
  insert,
};
