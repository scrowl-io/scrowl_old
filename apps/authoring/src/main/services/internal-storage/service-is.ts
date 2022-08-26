import { app } from 'electron';
import path from 'path';
import knex, { Knex } from 'knex';
import {
  StorageData,
  StorageSchema,
  StorageSchemaColumn,
  StorageQuery,
  StorageResult,
  StorageOrder,
} from './service-is.types';
import { ApiResult } from '../requester';

const pathStorage = path.join(
  `${app.getPath('userData')}`,
  'scrowl-authoring.sqlite'
);

const dbConfig: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: pathStorage,
  },
};

const DB = knex(dbConfig);

// [util, schema] creates a id column
const uuid = (table: Knex.TableBuilder, col = 'id') => {
  if (col !== 'id') {
    throw new Error(
      `Unable to create primary column: primary columns must be named "id" not ${col}`
    );
  }

  table.increments(col).primary();
};

// [util, schema] set a foreign key relationship
const foreignKey = (
  table: Knex.TableBuilder,
  config: { columnName: string; tableName: string }
) => {
  table.foreign(config.columnName).references(`${config.tableName}.id`);
};

// drops a table DANGEROUS!!!
export const __tableDrop = (tableName: string) => {
  return DB.schema.dropTableIfExists(tableName);
};

// creates a table in the DB based on a schema
export const __tableCreate = (tableName: string, schema: StorageSchema) => {
  const processCol = (
    table: Knex.TableBuilder,
    { column }: StorageSchemaColumn
  ) => {
    switch (column.type) {
      case 'uuid':
        uuid(table, column.name);
        break;
      case 'string':
        table.string(column.name);
        break;
      case 'integer':
        table.integer(column.name);
        break;
      case 'decimal':
        table.decimal(column.name);
        break;
      case 'foreign':
        if (!column.table) {
          console.error(
            `Unable to create foreign key: foreign table required - ${tableName}/${column.name}`
          );
          return;
        }

        table.integer(column.name).unsigned().notNullable();
        foreignKey(table, { columnName: column.name, tableName: column.table });
        break;
      case 'datetime':
        table.datetime(column.name).defaultTo(DB.fn.now());
        break;
      case 'timestamp':
        table.timestamp(column.name).defaultTo(DB.fn.now());
        break;
      case 'json':
        table.json(column.name);
        break;
      default:
        console.warn(
          `Unable to create column from table schema: column type ${column.type} not supported - ${tableName}/${column.name}`
        );
        break;
    }
  };
  const processTable = () => {
    return new Promise(resolve => {
      DB.schema
        .createTable(tableName, (table: Knex.TableBuilder) => {
          schema.forEach((schemaCol: StorageSchemaColumn) => {
            processCol(table, schemaCol);
          });
        })
        .then(() => {
          resolve(true);
        })
        .catch(e => {
          console.error(`failed to create table: ${tableName}`, e);
          resolve(false);
        });
    });
  };

  return new Promise<StorageResult>(resolve => {
    try {
      __tableDrop(tableName).then(() => {
        //TODO this and the exists check needs to be replaced with a migration step
        DB.schema.hasTable(tableName).then(exists => {
          if (exists) {
            resolve({
              error: false,
              data: {
                created: false,
                tableName,
              },
            });
            return;
          }

          processTable().then(() => {
            resolve({
              error: false,
              data: {
                created: true,
                tableName,
              },
            });
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to create table',
        data: {
          trace: e,
        },
      });
    }
  });
};

const returnItem = (tableName: string, ids: Array<number>) => {
  return new Promise<ApiResult>(resolve => {
    try {
      read(tableName, { id: ids[0] }).then(res => {
        if (res.error) {
          resolve(res);
          return;
        }

        resolve({
          error: false,
          data: {
            item: res.data.items[0],
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to return item',
        data: {
          tableName,
          ids,
          trace: e,
        },
      });
    }
  });
};

// creates a item(s) in a table, returns the id(s) by default.
export const create = (
  tableName: string,
  data: StorageData | Array<StorageData>
) => {
  return new Promise<StorageResult>(resolve => {
    try {
      DB(tableName)
        .insert(data)
        .then(ids => {
          returnItem(tableName, ids).then(resolve);
        });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to create item(s)',
        data: {
          trace: e,
          tableName,
          data,
        },
      });
    }
  });
};

// returns item(s) from a table
export const read = (
  tableName: string,
  query?: StorageQuery,
  order?: StorageOrder,
  limit?: number
) => {
  return new Promise<ApiResult>(resolve => {
    const returnResult = (items: Array<StorageData>) => {
      resolve({
        error: false,
        data: {
          items,
        },
      });
    };

    try {
      if (query) {
        if (order) {
          if (limit) {
            DB.select()
              .from(tableName)
              .where(query)
              .orderBy(order)
              .limit(limit)
              .then(returnResult);
            return;
          }

          DB.select()
            .from(tableName)
            .where(query)
            .orderBy(order)
            .then(returnResult);
          return;
        }

        if (limit) {
          DB.select()
            .from(tableName)
            .where(query)
            .limit(limit)
            .then(returnResult);
          return;
        }

        DB.select().from(tableName).where(query).then(returnResult);
        return;
      }

      if (order) {
        if (limit) {
          DB.select()
            .from(tableName)
            .orderBy(order)
            .limit(limit)
            .then(returnResult);
          return;
        }

        DB.select().from(tableName).orderBy(order).then(returnResult);
        return;
      }

      if (limit) {
        DB.select().from(tableName).limit(10).then(returnResult);
        return;
      }

      DB.select().from(tableName).then(returnResult);
      return;
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to read from storage',
        data: {
          trace: e,
        },
      });
    }
  });
};

// updates item(s) in a table
export const update = (
  tableName: string,
  data: StorageData,
  query: StorageQuery
) => {
  return new Promise<ApiResult>(resolve => {
    try {
      if (data.updated_at) {
        delete data.updated_at;
        DB(tableName)
          .update(data)
          .update('updated_at', DB.fn.now())
          .where(query)
          .then(() => {
            returnItem(tableName, [data.id]).then(resolve);
          });
      } else {
        DB(tableName)
          .update(data)
          .where(query)
          .then(() => {
            returnItem(tableName, [data.id]).then(resolve);
          });
      }
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to update ${tableName}`,
        data: {
          data,
          query,
          trace: e,
        },
      });
    }
  });
};

// deletes item(s) in a table
export const remove = (tableName: string, query: StorageQuery) => {
  return DB(tableName).where(query).del();
};

export const init = () => {
  return new Promise<ApiResult>(resolve => {
    try {
      // SQLite doesn't have FKeys enabled by default - need to enable them
      DB.raw('PRAGMA foreign_keys = ON;').then(() => {
        resolve({
          error: false,
          data: {
            init: true,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to initialize Internal Storage',
        data: {
          trace: e,
        },
      });
    }
  });
};

export default {
  __tableDrop,
  __tableCreate,
  create,
  read,
  update,
  remove,
};
