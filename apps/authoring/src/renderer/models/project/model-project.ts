import { useState, useEffect } from 'react';
import { AllowedFiles } from '../../../main/services/file-system';
import {
  ProjectData,
  ProjectDataNew,
  ProjectEventApi,
  SaveResult,
  ImportResult,
  OpenResult,
  CreateResult,
} from '../../../main/models/project';
import {
  ProjectObserverDataFn,
  ProjectObserverProcessFn,
  ProjectObserverImportFn,
} from './model-project.types';
import { requester, Menu } from '../../services';

export const ENDPOINTS: ProjectEventApi = {
  save: 'project/save',
  import: 'project/import-file',
};
export class Project {
  data?: ProjectData | ProjectDataNew;
  isProcessing: boolean;
  isReady: boolean;
  lastImport: string;
  __observerData?: ProjectObserverDataFn;
  __observerProcess?: ProjectObserverProcessFn;
  __observerImport?: ProjectObserverImportFn;
  constructor(data?: ProjectDataNew) {
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

    Menu.File.onProjectNew((event, result: CreateResult) => {
      console.log(result);
      if (this.data && this.data.workingDir) {
        console.error('Unable to create project - project already created');
        return;
      }

      if (result.error || !result.data.filename || !result.data.project) {
        console.error('Unable to create project - project not created');
        return;
      }

      this.create(result.data.project);
    });

    Menu.File.onProjectOpen((event, result: OpenResult) => {
      if (!result.error || !result.data) {
        this.create(result.data.contents);
      }
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
  };
  __setData = (data: ProjectData | ProjectDataNew) => {
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
  __update = (data: ProjectData | ProjectDataNew) => {
    if (!this.__observerData) {
      return;
    }

    this.__setProcessing(true);

    if (data && data.workingDir) {
      Promise.allSettled([
        Menu.Global.disable(Menu.Global.ITEMS.projectNew),
        Menu.Global.disable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.enable(Menu.Global.ITEMS.projectSave),
        Menu.Global.enable(Menu.Global.ITEMS.projectSaveAs),
        Menu.Global.enable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    } else {
      Promise.allSettled([
        Menu.Global.enable(Menu.Global.ITEMS.projectNew),
        Menu.Global.enable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.disable(Menu.Global.ITEMS.projectSave),
        Menu.Global.disable(Menu.Global.ITEMS.projectSaveAs),
        Menu.Global.disable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    }
  };
  create = (data: ProjectDataNew) => {
    this.__setProcessing(true);

    try {
      this.__update(data);
      this.__setProcessing(false);
    } catch (error) {
      console.log(error);
      this.__setProcessing(false);
    }
  };
  update = (saveAs?: boolean) => {
    this.__setProcessing(true);

    return new Promise<SaveResult>((resolve, reject) => {
      requester
        .invoke(ENDPOINTS.save, this.data, saveAs)
        .then((result: SaveResult) => {
          if (result.error) {
            resolve(result);
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
  saveAs() {
    return this.update(true);
  }
  importFile = (fileTypes: AllowedFiles[]) => {
    this.__setProcessing(true);

    return new Promise<ImportResult>(resolve => {
      if (!this.data || !this.data.workingDir) {
        this.__setProcessing(false);
        resolve({
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
            resolve(result);
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
    const [activeData, setActiveData] = useState<
      ProjectData | ProjectDataNew
    >();

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
