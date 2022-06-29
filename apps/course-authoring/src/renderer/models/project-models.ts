import { AllowedFiles, FileData } from '../../main/services/file-system';
import { Project } from '../pages/home/data.types';
import { send } from '../services/requester/requester';

export const create = (project: Project) => {
  return new Promise<FileData>((resolve, reject) => {
    send('project-create', project)
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
  return send('project-save', project, source);
};

export const importFile = (fileTypes: AllowedFiles[], source: string) => {
  return send('project-import', fileTypes, source);
};

export default {
  create,
  save,
  importFile,
};
