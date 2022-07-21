import { Requester } from "../../services";

export interface ProjectEventNew extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'project/new';
}

export interface ProjectEventSave extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'project/save';
}

export interface ProjectEventImport extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'project/import-file';
}

export type ProjectEventApi = {
  'new': ProjectEventNew['name'];
  'save': ProjectEventSave['name'];
  'import': ProjectEventImport['name'];
};

export type ProjectEventNames = 
  | ProjectEventNew['name']
  | ProjectEventSave['name']
  | ProjectEventImport['name'];

export type ProjectEvent =
  | ProjectEventNew
  | ProjectEventSave
  | ProjectEventImport

export type ProjectEvents = {
  new: ProjectEventNew;
  save: ProjectEventSave;
  import: ProjectEventImport;
};

/**
 * This interface should be updated once
 * define the actual project structure.
 */
 export interface ProjectData {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description: string;
  theme: string;
  workingDir?: string;
};

export interface ProjectDataNew {
  name?: string;
  description?: string;
  theme?: string;
  workingDir?: string;
};
