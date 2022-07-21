import { useState, useEffect } from 'react';
import {
  AllowedFiles,
  FileData,
  OpenFileData,
} from '../../../main/services/file-system';
import { ProjectData, ProjectDataNew, ProjectEventApi } from '../../../main/models/project';
import { ProjectObserverDataFn, ProjectObserverProcessFn, ProjectObserverImportFn } from './model-project.types';
import { requester, Menu } from '../../services';
import EXAMPLE_DATA from './model-project-data';

export const ENDPOINTS:ProjectEventApi = {
  new: 'project/new',
  save: 'project/save',
  import: 'project/import-file'
}
export class Project {
  data?: ProjectData | ProjectDataNew;
  isProcessing: boolean;
  isReady: boolean;
  importedFiles: Array<string>;
  lastImport: string;
  __observerData?: ProjectObserverDataFn;
  __observerProcess?: ProjectObserverProcessFn;
  __observerImport?: ProjectObserverImportFn;
  constructor(data?: ProjectDataNew) {
    this.isProcessing = false;
    this.isReady = false;
    this.importedFiles = [];
    this.lastImport = '';

    if (data) {
      this.data = data;
    }
  }
  ready = () => {
    if (this.isReady) {
      return;
    }

    Menu.File.onProjectNew(() => {
      if (this.data && this.data.workingDir) {
        console.error('Unbale to create project - project already created');
        return;
      }
    
      this.create(EXAMPLE_DATA);
    });

    Menu.File.onProjectSave(() => {
      if (!this.data || !this.data.workingDir) {
        console.error('Unable to save project - project not created');
        return;
      }
      
      this.save();
    });

    Menu.File.onProjectSaveAs(() => {
      if (!this.data || !this.data.workingDir) {
        console.error('Unable to save project - project not created');
        return;
      }
      
      this.saveAs();
    });

    Menu.File.onImportFile(() => {
      if (!this.data || !this.data.workingDir) {
        console.error('Unable to import file - project not created');
        return;
      }

      this.importFile(['image']);
    });

    this.isReady = true;
  }
  __setData = (data: ProjectData | ProjectDataNew) => {
    if (!this.__observerData) {
      return;
    }

    this.__observerData(data);
    this.__setProcessing(false);
  }
  __setProcessing = (state: boolean) => {
    if (!this.__observerProcess) {
      return;
    }

    this.__observerProcess(state);
  }
  __update = (data: ProjectData | ProjectDataNew) => {
    if (!this.__observerData) {
      return;
    }
    
    this.__setProcessing(true);

    if (data && data.workingDir) {
      Promise.allSettled([
        Menu.Global.disable(Menu.Global.ITEMS.projectNew),
        Menu.Global.enable(Menu.Global.ITEMS.projectSave),
        Menu.Global.enable(Menu.Global.ITEMS.projectSaveAs),
        Menu.Global.enable(Menu.Global.ITEMS.importFile),
      ]).then(res => {
        this.__setData(data);
      });
    } else {
      Promise.allSettled([
        Menu.Global.enable(Menu.Global.ITEMS.projectNew),
        Menu.Global.disable(Menu.Global.ITEMS.projectSave),
        Menu.Global.disable(Menu.Global.ITEMS.projectSaveAs),
        Menu.Global.disable(Menu.Global.ITEMS.importFile),
      ]).then(res => {
        this.__setData(data);
      });
    }
  }
  create = (data:ProjectDataNew) => {
    this.__setProcessing(true);

    return new Promise<FileData>((resolve, reject) => {
      requester.invoke(ENDPOINTS.new, data)
        .then((result: FileData) => {
          if (result.error) {
            resolve(result);
            this.__setProcessing(false);
            return;
          }
          const data: ProjectDataNew = {};

          if (result.filename) {
            data.workingDir = result.filename.split('/').slice(0, -1).join('/');
          }

          this.__update(data);
          resolve(result);
        })
        .catch(reject);
    });
  }
  update = (saveAs?: boolean) => {
    this.__setProcessing(true);

    return new Promise<FileData>((resolve, reject) => {
      requester.invoke(ENDPOINTS.save, this.data, saveAs)
        .then((result: FileData) => {
          if (result.error) {
            resolve(result);
            this.__setProcessing(false);
            return;
          }
          const data: ProjectDataNew = {};

          if (result.filename) {
            data.workingDir = result.filename.split('/').slice(0, -1).join('/');
          }

          this.__update(data);
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
  importFile = (fileTypes: AllowedFiles[]) => {
    this.__setProcessing(true);

    return new Promise<OpenFileData>((resolve, reject) => {
      if (!this.data || !this.data.workingDir) {
        this.__setProcessing(false);
        resolve({
          error: true,
          message: 'Unable to import file - project has no working directory',
          canceled: false,
          filePaths: []
        });
        return;
      }

      requester.invoke(ENDPOINTS.import, fileTypes, this.data.workingDir)
        .then((result: OpenFileData) => {
          if (result.error) {
            this.__setProcessing(false);
            resolve(result);
            return;
          }

          if (result.filename) {
            const url = `scrowl-file://${result.filename}`;

            this.importedFiles.push(url);

            if (this.__observerImport) {
              this.__observerImport(url);
            }
          }
          // TODO: backend should return data
          // data should be keeping track of all imported files
          // trigger update here
          this.__setProcessing(false);
          resolve(result)
        })
    });
  }
  useProcessing = () => {
    const [isProcessing, setProcessState] = useState<boolean>(false);

    this.isProcessing = isProcessing;

    useEffect(() => {
      this.__observerProcess = setProcessState;

      return () => {
        this.__observerProcess = undefined;
      }
    });

    return this.isProcessing;
  }
  useProjectData = () => {
    const [activeData, setActiveData] = useState<ProjectData | ProjectDataNew>();

    this.data = activeData;

    useEffect(() => {
      this.__observerData = setActiveData;

      return () => {
        this.__observerData = undefined;
      }
    });

    return this.data;
  }
  useLastImport = () => {
    const [lastImport, setLastImport] = useState<string>('');

    this.lastImport = lastImport;

    useEffect(() => {
      this.__observerImport = setLastImport;

      return () => {
        this.__observerImport = undefined;
      }
    });

    return this.lastImport;
  }
};
