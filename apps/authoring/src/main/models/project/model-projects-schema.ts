import { InternalStorage } from '../../services';

export const name = 'projects';

export const schema: InternalStorage.StorageSchema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    },
  },
  {
    column: {
      name: 'name',
      type: 'string',
    },
  },
  {
    column: {
      name: 'filename',
      type: 'string',
    },
  },
  {
    column: {
      name: 'created_at',
      type: 'datetime',
    },
  },
  {
    column: {
      name: 'opened_at',
      type: 'datetime',
    },
  },
  {
    column: {
      name: 'updated_at',
      type: 'datetime',
    },
  },
];

export default {
  name,
  schema,
};
