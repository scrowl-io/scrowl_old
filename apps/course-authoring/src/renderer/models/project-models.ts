import { AllowedFiles, FileData } from '../../main/services/file-system';
import { Project } from '../pages/home/data.types';
import { invoke, on, send } from '../services/requester/requester';

export const create = (project: Project) => {
  return new Promise<FileData>((resolve, reject) => {
    invoke('project-create', project)
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
  return invoke('project-save', project, source);
};

export const importFile = (fileTypes: AllowedFiles[], source: string) => {
  return invoke('project-import', fileTypes, source);
};

export const menuToggleEnabledItemById = (menuItemId: string) => {
  send('menu-toggle-enable-item-by-id', menuItemId);
};

export const menuNewProject = (callback: (...args: unknown[]) => void) => {
  on('menu-project-create', callback);
};

export default {
  create,
  save,
  importFile,
  menuToggleEnabledItemById,
  menuNewProject,
};
