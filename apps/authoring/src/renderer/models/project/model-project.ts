import { useState, useEffect } from 'react';
import { AllowedFiles } from '../../../main/services/file-system';
import {
  ProjectData,
  ProjectEventApi,
  SaveResult,
  ImportResult,
  CreateResult,
} from '../../../main/models/project';
import {
  ProjectObserverDataFn,
  ProjectObserverProcessFn,
  ProjectObserverImportFn,
} from './model-project.types';
import { requester, Menu } from '../../services';

export const ENDPOINTS: ProjectEventApi = {
  new: '/projects/create',
  save: 'project/save',
  open: '/projects/open',
  getFiles: '/projects/list',
  getRecentFiles: '/projects/list/recent',
  import: 'project/import-file',
};
export class Project {
  data?: ProjectData;
  isProcessing: boolean;
  isReady: boolean;
  lastImport: string;
  __observerData?: ProjectObserverDataFn;
  __observerProcess?: ProjectObserverProcessFn;
  __observerImport?: ProjectObserverImportFn;
  constructor(data?: ProjectData) {
    this.isProcessing = false;
    this.isReady = false;
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
        console.error('Unable to create project - project already created');
        return;
      }

      // TODO: Replace the alert with a modal containing a list ot templates. Choosing the template should return the projectID of the selected template
      alert('Click OK to start a new empty project.');

      // TODO: The projectID from the template selection above will be passed by as argument to the create function.
      this.create('example-id');
    });

    Menu.File.onProjectOpen(() => {
      this.__setProcessing(true);
      console.log('Display modal with recent files to open...');
      this.__setProcessing(false);
    });

    Menu.File.onProjectSave(() => {
      if (!this.data || !this.data.workingDir) {
        console.error('Unable to save project - project not created');
        return;
      }

      this.save();
    });

    Menu.File.onImportFile(() => {
      if (!this.data || !this.data.workingDir) {
        console.error('Unable to import file - project not created');
        return;
      }

      this.importFile(['image']);
    });

    this.isReady = true;
  };
  __setData = (data: ProjectData) => {
    if (!this.__observerData) {
      return;
    }

    this.__observerData(data);
    this.__setProcessing(false);
  };
  __setProcessing = (state: boolean) => {
    if (!this.__observerProcess) {
      return;
    }

    this.__observerProcess(state);
  };
  __update = (data: ProjectData) => {
    if (!this.__observerData) {
      return;
    }

    this.__setProcessing(true);

    if (data && data.workingDir) {
      Promise.allSettled([
        Menu.Global.disable(Menu.Global.ITEMS.projectsCreate),
        Menu.Global.disable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.enable(Menu.Global.ITEMS.projectSave),
        Menu.Global.enable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    } else {
      Promise.allSettled([
        Menu.Global.enable(Menu.Global.ITEMS.projectsCreate),
        Menu.Global.enable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.disable(Menu.Global.ITEMS.projectSave),
        Menu.Global.disable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    }
  };

  // TODO: The projectID type needs to be updated to accept only the proper template IDs
  create = (projectID: string) => {
    this.__setProcessing(true);

    return new Promise<CreateResult>((resolve, reject) => {
      requester
        .invoke(ENDPOINTS.new, projectID)
        .then((result: CreateResult) => {
          if (result.error) {
            reject(result);
            this.__setProcessing(false);
            console.error(result);
            return;
          }

          this.__update(result.data.project);
          resolve(result);
        })
        .catch(reject);
    });
  };

  update = (saveAs?: boolean) => {
    this.__setProcessing(true);

    return new Promise<SaveResult>((resolve, reject) => {
      requester
        .invoke(ENDPOINTS.save, this.data, saveAs)
        .then((result: SaveResult) => {
          if (result.error) {
            reject(result);
            this.__setProcessing(false);
            console.error(result);
            return;
          }

          this.__update(result.data.project);
          resolve(result);
        })
        .catch(reject);
    });
  };
  save() {
    return this.update();
  }
  importFile = (fileTypes: AllowedFiles[]) => {
    this.__setProcessing(true);

    return new Promise<ImportResult>((resolve, reject) => {
      if (!this.data || !this.data.workingDir) {
        this.__setProcessing(false);
        reject({
          error: true,
          message: 'Unable to import file - project has no working directory',
          canceled: false,
          filePaths: [],
        });
        return;
      }

      requester
        .invoke(ENDPOINTS.import, fileTypes, this.data)
        .then((result: ImportResult) => {
          if (result.error) {
            this.__setProcessing(false);
            reject(result);
            console.error(result);
            return;
          }

          if (!result.data.import) {
            this.__setProcessing(false);
            resolve({
              error: true,
              message: 'Importing file failed',
              data: result,
            });
            return;
          }

          const url = `scrowl-file://${result.data.import}`;

          if (this.__observerImport) {
            this.__update(result.data.project);
            this.__observerImport(url);
          }

          this.__setProcessing(false);
          resolve(result);
        });
    });
  };
  useProcessing = () => {
    const [isProcessing, setProcessState] = useState<boolean>(false);

    this.isProcessing = isProcessing;

    useEffect(() => {
      this.__observerProcess = setProcessState;

      return () => {
        this.__observerProcess = undefined;
      };
    }, [isProcessing]);

    return this.isProcessing;
  };
  useProjectData = () => {
    const [activeData, setActiveData] = useState<ProjectData>();

    this.data = activeData;

    useEffect(() => {
      this.__observerData = setActiveData;

      return () => {
        this.__observerData = undefined;
      };
    }, [activeData]);

    return this.data;
  };
  useLastImport = () => {
    const [lastImport, setLastImport] = useState<string>('');

    this.lastImport = lastImport;

    useEffect(() => {
      this.__observerImport = setLastImport;

      return () => {
        this.__observerImport = undefined;
      };
    }, [lastImport]);

    return this.lastImport;
  };
}
