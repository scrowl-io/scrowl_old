import {
  FileFilter,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
} from 'electron';

export interface FileFilters {
  [key: string]: FileFilter;
}

export type AllowedFiles = 'image' | 'video' | 'scrowl';

export interface OpenFileData extends OpenDialogReturnValue {
  error?: boolean;
  message?: unknown;
}

export interface SaveFileData extends SaveDialogReturnValue {
  error?: boolean;
  message?: unknown;
}
