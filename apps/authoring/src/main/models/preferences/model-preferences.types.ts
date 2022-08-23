import { Requester, InternalStorage } from '../../services';

export interface PreferenceEventCreate
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/preferences/create';
}

export interface PreferenceEventGet
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/preferences';
}

export interface PreferenceEventSave
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/preferences/save';
}

export interface PreferenceEventOpen
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/preferences/open';
}

export type PreferenceEventApi = {
  create: PreferenceEventCreate['name'];
  get: PreferenceEventGet['name'];
  save: PreferenceEventSave['name'];
  open: PreferenceEventOpen['name'];
};

export type PreferenceEventNames =
  | PreferenceEventCreate['name']
  | PreferenceEventGet['name']
  | PreferenceEventSave['name']
  | PreferenceEventOpen['name'];

export type PreferenceEvents = {
  create: PreferenceEventCreate;
  onCreate: PreferenceEventCreate;
  get: PreferenceEventGet;
  save: PreferenceEventSave;
  open: PreferenceEventOpen;
};

export interface PreferenceData extends InternalStorage.StorageData {
  id?: string;
  created_at?: string;
  updated_at?: string;
  theme?: 'dark' | 'light';
}
