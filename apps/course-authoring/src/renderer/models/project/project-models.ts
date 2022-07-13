import {
  AllowedFiles,
  FileData,
} from '../../../main/services/file-system/types';
import { PROJECT_IPC_EVENTS } from '../../../main/models/project/events';
import { Project } from '../../pages/home/data.types';
import { invoke } from '../../services/requester/requester';

export const create = (project: Project) => {
  return new Promise<FileData>((resolve, reject) => {
    invoke(PROJECT_IPC_EVENTS.new, project)
      .then((res: FileData) => {
        if (res.error) {
          resolve(res);
          return;
        }

        if (res.filename) {
          res.dir = res.filename.split('/').slice(0, -1).join('/');
        }

        resolve(res);
      })
      .catch(reject);
  });
};

export const save = (project: string, isSaveAs: boolean, source?: string) => {
  return invoke(PROJECT_IPC_EVENTS.save, project, isSaveAs, source);
};

export const importFile = (fileTypes: AllowedFiles[], source: string) => {
  return invoke(PROJECT_IPC_EVENTS.importFile, fileTypes, source);
};

export default {
  create,
  save,
  importFile,
};
