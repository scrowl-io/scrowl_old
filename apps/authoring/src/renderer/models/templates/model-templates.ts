import { useState, useEffect } from 'react';
import { TemplateData, TemplateEventApi } from '../../../main/models/templates';
import {
  TemplateObserverDataFn,
  TemplateObserverImportFn,
  TemplateObserverProcessFn,
} from './model-templates.types';
import { requester, Menu } from '../../services';

const ENDPOINTS: TemplateEventApi = {
  import: '/templates/import',
  open: '/templates/open',
  list: '/templates/list',
  load: '/templates/load',
};

export const ENDPOINTS_TEMPLATE = ENDPOINTS;

export class Template {
  data?: TemplateData;
  isProcessing: boolean;
  isReady: boolean;
  lastImport: string;
  __observerData?: TemplateObserverDataFn;
  __observerProcess?: TemplateObserverProcessFn;
  __observerImport?: TemplateObserverImportFn;
  constructor(data?: TemplateData) {
    this.isProcessing = false;
    this.isReady = false;
    this.lastImport = '';

    if (data) {
      this.data = data;
    }
  }
  __setProcessing = (state: boolean) => {
    if (!this.__observerProcess) {
      return;
    }

    this.__observerProcess(state);
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
  __setData = (data: TemplateData) => {
    if (!this.__observerData) {
      return;
    }

    this.__observerData(data);
    this.__setProcessing(false);
  };
  useData = () => {
    const [activeData, setActiveData] = useState<TemplateData>();

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
  __update = (data: TemplateData) => {
    if (!this.__observerData) {
      return;
    }

    this.__setProcessing(true);
    this.__setData(data);
  };
  ready = () => {
    if (this.isReady) {
      return;
    }

    Menu.File.onImportTemplate((ev, result) => {
      if (result.error) {
        console.error(result);
        return;
      }

      this.__update(result.data.template);
    });
  };
  import = () => {
    this.__setProcessing(true);
    requester.send(ENDPOINTS.import);
  };
}
