import { FileFilter, SaveDialogReturnValue } from 'electron';

export interface FileFilters {
  [key: string]: FileFilter;
}

export type AllowedFiles = 'image' | 'video' | 'scrowl';

export interface FileData extends SaveDialogReturnValue {
  error?: boolean;
  message?: unknown;
}
