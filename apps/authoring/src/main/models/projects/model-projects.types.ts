import { Requester, FileSystem, InternalStorage } from '../../services';

export interface ProjectEventCreate
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/projects/create';
}

export interface ProjectEventSave
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/projects/save';
}

export interface ProjectEventOpen
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/projects/open';
}

export interface ProjectEventList
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/projects/list';
}

export interface ProjectEventImport
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'project/import-file';
}

export interface ProjectEventPublish
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: '/projects/publish';
}

export type ProjectEventApi = {
  create: ProjectEventCreate['name'];
  save: ProjectEventSave['name'];
  open: ProjectEventOpen['name'];
  list: ProjectEventList['name'];
  import: ProjectEventImport['name'];
  publish: ProjectEventPublish['name'];
};

export type ProjectEventNames =
  | ProjectEventCreate['name']
  | ProjectEventSave['name']
  | ProjectEventOpen['name']
  | ProjectEventList['name']
  | ProjectEventImport['name']
  | ProjectEventPublish['name'];

export type ProjectEvent =
  | ProjectEventCreate
  | ProjectEventSave
  | ProjectEventOpen
  | ProjectEventList
  | ProjectEventImport
  | ProjectEventPublish;

export type ProjectEvents = {
  create: ProjectEventCreate;
  onCreate: ProjectEventCreate;
  save: ProjectEventSave;
  onSave: ProjectEventSave;
  open: ProjectEventOpen;
  onOpen: ProjectEventOpen;
  list: ProjectEventList;
  import: ProjectEventImport;
  onImport: ProjectEventImport;
  publish: ProjectEventPublish;
  onPublish: ProjectEventPublish;
};

/**
 * This interface should be updated once
 * define the actual project structure.
 */
export type ProjectGlossaryItem = {
  name: string;
  description: string;
};

export type ProjectResourceItem = {
  name: string;
  description?: string;
};

export type ProjectSlide = {
  name: string;
  template?: {
    version: string;
    slide: {
      aspect: '4:3' | '16:9' | '16:10';
    };
    meta: {
      name: string;
      component: string;
    };
    elements: {
      [key: string]: {
        editable: boolean;
        value: string | number | boolean;
      };
    };
  };
};

export type ProjectLesson = {
  name: string;
  slides: Array<ProjectSlide>;
};

export type ProjectModule = {
  name: string;
  lessons: Array<ProjectLesson>;
};

export interface ProjectData extends InternalStorage.StorageData {
  id?: string;
  created_at?: string;
  updated_at?: string;
  opened_at?: string;
  name?: string;
  description?: string;
  authors?: string;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResourceItem>;
  modules?: Array<ProjectModule>;
}

interface CreateResultSuccess
  extends Omit<FileSystem.FileDataResultSuccess, 'data'> {
  data: {
    filename: string;
    project: ProjectData;
  };
}

export type CreateResult =
  | CreateResultSuccess
  | FileSystem.DirectoryTempResult
  | FileSystem.FileDataResult;

interface OpenResultSuccess
  extends Omit<FileSystem.FileDataResultSuccess, 'data'> {
  data: {
    filename: string;
    project: ProjectData;
  };
}

export type OpenResult =
  | OpenResultSuccess
  | FileSystem.DirectoryTempResult
  | FileSystem.FileDataResult;

export interface SaveResultSuccess
  extends Omit<FileSystem.FileDataResultSuccess, 'data'> {
  data: {
    filename: string;
    project: ProjectData;
  };
}

export type SaveResult =
  | SaveResultSuccess
  | FileSystem.DialogSaveResult
  | FileSystem.FileDataResult;

export interface ImportResultSuccess
  extends Omit<FileSystem.DialogOpenResultSuccess, 'data'> {
  data: {
    import: string;
    project: ProjectData;
  };
}

export type ImportResult =
  | ImportResultSuccess
  | FileSystem.DialogOpenResult
  | FileSystem.FileDataResult;
