import { InternalStorage, Requester, FileSystem } from '../../services';

export type PreferenceAppearance = 'light' | 'dark';

export interface PreferenceData extends InternalStorage.DatabaseData {
  appearance: PreferenceAppearance;
}

export interface PreferenceEventList
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'preferences/get';
}

export interface PreferenceEventGet
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'preferences/get/preference';
}

export interface PreferenceEventSet
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'preferences/set';
}

export type PreferenceEventNames =
  | PreferenceEventList['name']
  | PreferenceEventGet['name']
  | PreferenceEventSet['name'];

export type PreferenceEvent =
  | PreferenceEventList
  | PreferenceEventGet
  | PreferenceEventSet;

export type PreferenceEvents = {
  list: PreferenceEventList;
  get: PreferenceEventGet;
  set: PreferenceEventSet;
};

interface CreateResultSuccess
  extends Omit<FileSystem.FileDataResultSuccess, 'data'> {
  data: {
    preferences: PreferenceData | PreferenceData;
  };
}

export type CreateResult =
  | CreateResultSuccess
  | FileSystem.DirectoryTempResult
  | FileSystem.FileDataResult;
