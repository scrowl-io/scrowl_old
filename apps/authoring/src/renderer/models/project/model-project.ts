import { useState, useEffect } from 'react';
import { AllowedFiles } from '../../../main/services/file-system';
import {
  ProjectData,
  ProjectEventApi,
  SaveResult,
  ImportResult,
} from '../../../main/models/projects';
import {
  ProjectObserverDataFn,
  ProjectObserverProcessFn,
  ProjectObserverImportFn,
} from './model-project.types';
import { requester, Menu } from '../../services';

const ENDPOINTS: ProjectEventApi = {
  create: '/projects/create',
  save: '/projects/save',
  open: '/projects/open',
  list: '/projects/list',
  import: 'project/import-file',
  publish: '/projects/publish',
};

export const ENDPOINTS_PROJECT = ENDPOINTS;

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

    Menu.File.onProjectCreate((ev, result) => {
      this.create();
    });

    Menu.File.onProjectOpen((ev, result) => {
      if (result.error) {
        console.error(result);
        return;
      }

      this.__update(result.data.project);
    });

    Menu.File.onProjectSave(() => {
      this.update();
    });

    Menu.File.onProjectPublish(() => {
      this.publish();
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

    if (data && data.id) {
      Promise.allSettled([
        Menu.Global.disable(Menu.Global.ITEMS.projectsCreate),
        Menu.Global.disable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.enable(Menu.Global.ITEMS.projectSave),
        Menu.Global.enable(Menu.Global.ITEMS.projectPublish),
        Menu.Global.enable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    } else {
      Promise.allSettled([
        Menu.Global.enable(Menu.Global.ITEMS.projectsCreate),
        Menu.Global.enable(Menu.Global.ITEMS.projectOpen),
        Menu.Global.disable(Menu.Global.ITEMS.projectSave),
        Menu.Global.disable(Menu.Global.ITEMS.projectPublish),
        Menu.Global.disable(Menu.Global.ITEMS.importFile),
      ]).then(() => {
        this.__setData(data);
      });
    }
  };
  create = (projectId?: number) => {
    this.__setProcessing(true);
    requester
      .invoke(ENDPOINTS.create, projectId)
      .then((result: requester.ApiResult) => {
        if (result.error) {
          this.__setProcessing(false);
          console.error(result);
          return;
        }

        this.__update(result.data.project);
      });
  };
  update = () => {
    this.__setProcessing(true);
    requester.invoke(ENDPOINTS.save, this.data).then((result: SaveResult) => {
      if (result.error) {
        this.__setProcessing(false);
        console.error(result);
        return;
      }

      this.__update(result.data.project);
    });
  };

  init = () => {
    this.ready();
    this.create(1);

    return new Promise(resolve => {
      resolve({
        error: false,
        data: {},
      });
    });
  };
  list = (limit?: number) => {
    return requester.invoke(ENDPOINTS.list, limit);
  };
  open = (projectId: number) => {
    this.__setProcessing(true);
    requester.send(ENDPOINTS.open, projectId);
  };
  importFile = (fileTypes: AllowedFiles[]) => {
    if (!this.data) {
      console.error('Unable to import file: project files not set');
      return;
    }

    this.__setProcessing(true);

    requester
      .invoke(ENDPOINTS.import, fileTypes, this.data)
      .then((result: ImportResult) => {
        if (result.error) {
          this.__setProcessing(false);
          console.error(result);
          return;
        }

        if (!result.data.import) {
          this.__setProcessing(false);
          console.error(result);
          return;
        }

        if (this.__observerImport) {
          const url = `scrowl-file://${result.data.import}`;

          this.__update(result.data.project);
          this.__observerImport(url);
        }

        this.__setProcessing(false);
      });
  };
  publish = () => {
    if (!this.data) {
      console.error('Unable to publish: project files not set');
    }

    this.__setProcessing(true);

    requester
      .invoke(ENDPOINTS.publish, this.data)
      .then((result: SaveResult) => {
        if (result.error) {
          this.__setProcessing(false);
          console.error(result);
          return;
        }

        console.log('Published', result);
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
  useData = () => {
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
