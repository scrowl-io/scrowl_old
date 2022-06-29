import knex from 'knex';
import path from 'path';

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './scrowl.sqlite'),
  },
  useNullAsDefault: true,
});

export default database;
