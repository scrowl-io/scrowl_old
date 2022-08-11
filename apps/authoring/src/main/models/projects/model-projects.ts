import { Model } from '../model.types';
import { PreferenceData } from './model-projects.types';
import { InternalStorage as IS } from '../../services';

const TABLE_NAME = 'projects';

export const get = async () => {
  const res = await IS.get(TABLE_NAME);

  return res;
};

export const insert = (data: PreferenceData) => {
  return IS.insert(TABLE_NAME, data).onConflict('id').ignore();
};

export const Projects: Model = {
  get,
  insert,
};

export default Projects;
