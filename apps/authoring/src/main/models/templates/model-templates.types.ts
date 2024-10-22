import { Requester, FileSystem, InternalStorage } from '../../services';

export interface TemplateEventInstall
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/templates/install';
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
  install: TemplateEventInstall['name'];
  open: TemplateEventOpen['name'];
  list: TemplateEventList['name'];
  load: TemplateEventLoad['name'];
};

export type TemplateEventNames =
  | TemplateEventInstall['name']
  | TemplateEventOpen['name']
  | TemplateEventList['name']
  | TemplateEventLoad['name'];

export type TemplateEvents = {
  install: TemplateEventInstall;
  onInstall: TemplateEventInstall;
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

export type AspectRatios = {
  '4:3': {
    label: 'Standard 4:3';
    width: 1920;
    height: 1440;
  };
  '16:9': {
    label: 'Widescreen 16:9';
    width: 1920;
    height: 1080;
  };
  '16:10': {
    label: 'Widescreen 16:10';
    width: 1920;
    height: 1200;
  };
};

export type TemplateManifestSlide = {
  aspect: keyof AspectRatios;
};

export type TemplateManifestElementText = {
  value: string;
  type: 'text';
  label: string;
};

export type TemplateManifestElementTextarea = {
  value: string;
  type: 'textarea';
  label: string;
};

export type TemplateManifestElementNumber = {
  value: number;
  type: 'number';
  label: string;
};

export type ManifestElementListText = {
  value: Array<string>;
  type: 'listText';
  label: string;
};

export type TemplateManifestElements = {
  [key: string]:
    | TemplateManifestElementText
    | TemplateManifestElementNumber
    | TemplateManifestElementTextarea
    | ManifestElementListText;
};

export interface TemplateManifestMeta {
  name: string;
  filename: string;
  component: string;
}

export interface TemplateManifest {
  version?: string;
  meta: TemplateManifestMeta;
  slide: TemplateManifestSlide;
  elements: TemplateManifestElements;
}

export type TemplateRecords = Array<{
  name: string;
  source: string;
  manifest: TemplateManifest;
}>;
