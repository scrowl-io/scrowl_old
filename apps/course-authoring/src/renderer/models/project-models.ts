import { AllowedFiles, FileData } from '../../main/services/file-system';
import { Project } from '../pages/home/data.types';
import { invoke } from '../services/requester/requester';

export const create = (project: Project) => {
  return new Promise<FileData>((resolve, reject) => {
    invoke('project:new', project)
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

export const save = (project: string, source?: string) => {
  return invoke('project:save', project, source);
};

export const importFile = (fileTypes: AllowedFiles[], source: string) => {
  return invoke('project:import-file', fileTypes, source);
};

export default {
  create,
  save,
  importFile,
};
