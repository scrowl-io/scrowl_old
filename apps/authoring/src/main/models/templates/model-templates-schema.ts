import { InternalStorage } from '../../services';

export const name = 'templates';

export const schema: InternalStorage.StorageSchema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    },
  },
  {
    column: {
      name: 'pathname',
      type: 'string',
    },
  },
];

export default {
  name,
  schema,
};
