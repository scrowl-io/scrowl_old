import { useState, useEffect } from 'react';
import { requester } from '../../services';
import { PreferenceData, CreateResult } from '../../../main/models/preferences';
import {
  PreferenceObserverDataFn,
  PreferenceObserverProcessFn,
} from './model-preferences.types';

export class Preferences {
  isProcessing: boolean;
  data?: PreferenceData;
  __observerData?: PreferenceObserverDataFn;
  __observerProcess?: PreferenceObserverProcessFn;
  constructor(data?: PreferenceData) {
    this.isProcessing = false;

    if (data) {
      this.data = data;
    }
  }
  __setData = (data: PreferenceData) => {
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
  __update = (data: PreferenceData) => {
    if (!this.__observerData) {
      return;
    }

    this.__setProcessing(true);
    this.__setData(data);
  };
  get = () => {
    this.__setProcessing(true);
    return new Promise((resolve, reject) => {
      requester
        .invoke('preferences/get')
        .then((result: CreateResult) => {
          if (result.error) {
            resolve(result);
            return;
          }

          this.__update(result.data.preferences);
          resolve(result);
        })
        .catch(reject);
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
    const [activeData, setActiveData] = useState<PreferenceData>();

    this.data = activeData;

    useEffect(() => {
      this.__observerData = setActiveData;

      return () => {
        this.__observerData = undefined;
      };
    }, [activeData]);

    return this.data;
  };
}
