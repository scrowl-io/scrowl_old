import { FileFilter } from 'electron';

export interface FileFilters {
  [key: string]: FileFilter;
}

export type AllowedFiles = 'image' | 'video' | 'scrowl';

export interface FileData {
  file: string | undefined;
  error: string;
}
