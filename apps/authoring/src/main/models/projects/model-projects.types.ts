import { InternalStorage } from '../../services';

export interface PreferenceData extends InternalStorage.StorageData {
  id: number;
  project_name: string;
}
