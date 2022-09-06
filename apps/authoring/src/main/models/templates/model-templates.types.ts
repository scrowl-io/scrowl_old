import { Requester, FileSystem, InternalStorage } from '../../services';

export interface TemplateEventAdd
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/templates/add';
}

export interface TemplateEventOpen
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/templates/open';
}

export interface TemplateEventList
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/templates/list';
}

export interface TemplateEventLoad
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/templates/load';
}

export type TemplateEventApi = {
  add: TemplateEventAdd['name'];
  open: TemplateEventOpen['name'];
  list: TemplateEventList['name'];
  load: TemplateEventLoad['name'];
};

export type TemplateEventNames =
  | TemplateEventAdd['name']
  | TemplateEventOpen['name']
  | TemplateEventList['name']
  | TemplateEventLoad['name'];

export type TemplateEvents = {
  add: TemplateEventAdd;
  onAdd: TemplateEventAdd;
  open: TemplateEventOpen;
  list: TemplateEventList;
  load: TemplateEventLoad;
};

export interface TemplateData extends InternalStorage.StorageData {
  id?: string;
  created_at?: string;
  updated_at?: string;
  pathname?: string;
}

export interface TemplateImportResultSuccess
  extends Omit<FileSystem.DialogOpenResultSuccess, 'data'> {
  data: {
    pathname: string;
    template: TemplateData;
  };
}

export type TemplateImportResult =
  | TemplateImportResultSuccess
  | FileSystem.DialogOpenResult
  | FileSystem.FileDataResult;
