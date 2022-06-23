import {
  FileFilter,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
} from 'electron';

export interface FileFilters {
  [key: string]: FileFilter;
}

export type AllowedFiles = 'image' | 'video' | 'scrowl';

export interface FileData {
  error?: boolean;
  message?: unknown;
  dirPath?: string;
}

export type OpenFileData = FileData & OpenDialogReturnValue;

export type SaveFileData = FileData & SaveDialogReturnValue;
