import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, requester } from '../../services';
import {
  PreferenceData,
  PreferenceEventApi,
} from '../../../main/models/preferences';
import {
  PreferenceObserverDataFn,
  PreferenceObserverProcessFn,
  PreferenceObserverOpenFn,
  PreferenceNavigator,
} from './model-preferences.types';

const ENDPOINTS: PreferenceEventApi = {
  create: '/preferences/create',
  get: '/preferences',
  save: '/preferences/save',
  open: '/preferences/open',
};

export const ENDPOINTS_PREFERENCES = ENDPOINTS;

export class Preferences {
  isReady: boolean;
  isProcessing: boolean;
  isOpen: boolean;
  data?: PreferenceData;
  defaultRoute?: string;
  __navigator?: PreferenceNavigator;
  __observerData?: PreferenceObserverDataFn;
  __observerProcess?: PreferenceObserverProcessFn;
  __observerOpen?: PreferenceObserverOpenFn;
  constructor(data?: PreferenceData) {
    this.isReady = false;
    this.isProcessing = false;
    this.isOpen = false;

    if (data) {
      this.data = data;
    }
  }
  ready = () => {
    if (this.isReady) {
      return;
    }

    Menu.File.onPreferencesCreate((ev, result) => {
      if (result.error) {
        console.error(result);
        return;
      }

      this.__update(result.data.preferences);
    });

    Menu.File.onPreferencesOpen(() => {
      this.__navigate();
    });
  };
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
  __navigate = () => {
    if (!this.__navigator || !this.defaultRoute) {
      return;
    }

    this.__navigator(this.defaultRoute);
  };
  __update = (data: PreferenceData) => {
    if (!this.__observerData) {
      return;
    }

    this.__setProcessing(true);
    this.__setData(data);
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
  useOpen = (to?: string) => {
    const navigator = useNavigate();

    this.defaultRoute = to || '/settings/theme';
    this.__navigator = navigator;
  };
  get = () => {
    this.__setProcessing(true);

    return new Promise<requester.ApiResult>(resolve => {
      try {
        requester.invoke(ENDPOINTS.get).then(result => {
          if (result.error) {
            this.__setProcessing(false);
            resolve(result);
            return;
          }

          this.__update(result.data.preferences);
          resolve(result);
        });
      } catch (e) {
        this.__setProcessing(false);
        resolve({
          error: true,
          message: 'Failed to get preferences',
          data: {
            trace: e,
          },
        });
      }
    });
  };
  update = () => {
    this.__setProcessing(true);
    requester.invoke(ENDPOINTS.save, this.data).then(result => {
      if (result.error) {
        this.__setProcessing(false);
        console.error(result);
        return;
      }

      this.__update(result.data.preferences);
    });
  };
}
