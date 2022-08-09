import { InternalStorage } from '../../services';

export interface PreferenceData extends InternalStorage.DatabaseData {
  id: number;
  project_name: string;
}
