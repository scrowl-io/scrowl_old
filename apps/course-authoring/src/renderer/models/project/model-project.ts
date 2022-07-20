import {
  AllowedFiles,
  FileData,
  OpenFileData,
} from '../../../main/services/file-system';
import { ProjectData, ProjectDataNew, ProjectEventApi } from '../../../main/models/project';
import { requester, Menu } from '../../services';

export const ENDPOINTS:ProjectEventApi = {
  new: 'project/new',
  save: 'project/save',
  import: 'project/import-file'
}
export class Project {
  workingDir: string;
  data: ProjectData | ProjectDataNew;
  constructor(data: ProjectDataNew) {
    this.workingDir = '';
    this.data = data;
  }
  create(data:ProjectDataNew) {
    const self = this;
    
    return new Promise<FileData>((resolve, reject) => {
      requester.invoke(ENDPOINTS.new, data)
        .then((result: FileData) => {
          if (result.error) {
            resolve(result);
            return;
          }

          if (result.filename) {
            self.workingDir = result.filename.split('/').slice(0, -1).join('/');
          }

          // TODO: backend should return data
          // update data here

          resolve(result);
        })
        .catch(reject);
    });
  }
  update(saveAs?: boolean) {
    const self = this;

    return new Promise<FileData>((resolve, reject) => {
      requester.invoke(ENDPOINTS.save, this.data, saveAs, self.workingDir)
        .then((result: FileData) => {
          if (result.error) {
            resolve(result);
            return;
          }

          if (result.filename) {
            self.workingDir = result.filename.split('/').slice(0, -1).join('/');
          }

          // TODO: backend should return data
          // update data here

          resolve(result);
        })
        .catch(reject);
    })
  }
  save() {
    return this.update();
  }
  saveAs() {
    return this.update(true);
  }
  importFile(fileTypes: AllowedFiles[]) {
    const self = this;

    return new Promise<OpenFileData>((resolve, reject) => {
      requester.invoke(ENDPOINTS.import, fileTypes, self.workingDir)
        .then((result: OpenFileData) => {
          if (result.error) {
            resolve(result);
            return;
          }

          // TODO: backend should return data
          // update data here
          // data should be keeping track of all imported files

          resolve(result)
        })
    });
  }
};
