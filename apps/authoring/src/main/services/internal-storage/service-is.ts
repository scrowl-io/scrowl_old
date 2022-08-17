import { app } from 'electron';
import path from 'path';
import knex, { Knex } from 'knex';
import {
  StorageData,
  StorageSchema,
  StorageSchemaColumn,
} from './service-is.types';

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

const uuid = (table: Knex.TableBuilder, col = 'id') => {
  switch (col) {
    case 'id':
      table
        .uuid(col)
        .primary()
        .notNullable()
        .unique()
        .defaultTo(DB.raw('uuid_generate_v4()'));
      break;
    default:
      table
        .uuid(col)
        .notNullable()
        .unique()
        .defaultTo(DB.raw('uuid_generate_v4()'));
      break;
  }
};

const foreignKey = (
  table: Knex.TableBuilder,
  config: { columnName: string; tableName: string }
) => {
  table.foreign(config.columnName).references(`${config.tableName}.id`);
};

export const __create = (tableName: string, schema: StorageSchema) => {
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

        table.uuid(column.name);
        foreignKey(table, { columnName: column.name, tableName: column.table });
        break;
      case 'datetime':
        table.datetime(column.name, { precision: 6 }).defaultTo(DB.fn.now(6));
        break;
      default:
        console.warn(
          `Unable to create column from table schema: column type ${column.type} not supported - ${tableName}/${column.name}`
        );
        break;
    }
  };

  return DB.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    schema.forEach((schemaCol: StorageSchemaColumn) => {
      processCol(table, schemaCol);
    });
  });
};

export const __drop = (tableName: string) => {
  return DB.schema.dropTableIfExists(tableName);
};

export const get = (tableName: string, column?: string) => {
  if (column) {
    return DB.select(column).from(tableName);
  }

  return DB.select().from(tableName);
};

export const insert = (tableName: string, data: StorageData) => {
  return DB(tableName).insert(data);
};

export const set = (tableName: string, data: StorageData) => {
  return DB(tableName).update(data);
};

// insert (create)  https://knexjs.org/guide/query-builder.html#insert
// select (read)    https://knexjs.org/guide/query-builder.html#select
// update (update)  https://knexjs.org/guide/query-builder.html#update
// delete (delete)  https://knexjs.org/guide/query-builder.html#del-delete

export default {
  __create,
  __drop,
  get,
  insert,
  set,
};
