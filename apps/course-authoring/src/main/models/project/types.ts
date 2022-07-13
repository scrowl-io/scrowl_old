export type ProjectEvent =
  | 'project/new'
  | 'project/save'
  | 'project/import-file';

export interface ProjectIpcEvents {
  [key: string]: ProjectEvent;
}
