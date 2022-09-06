import { InternalStorage } from '../../services';

export const name = 'preferences';

export const schema: InternalStorage.StorageSchema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    },
  },
  {
    column: {
      name: 'created_at',
      type: 'timestamp',
    },
  },
  {
    column: {
      name: 'updated_at',
      type: 'timestamp',
    },
  },
  {
    column: {
      name: 'theme',
      type: 'string',
    },
  },
];

export default {
  name,
  schema,
};
