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
