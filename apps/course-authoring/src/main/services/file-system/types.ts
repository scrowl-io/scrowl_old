import { FileFilter } from 'electron';

export interface FileTypes {
  [key: string]: FileFilter;
}

export type FileType = 'image' | 'video' | 'scrowl';
