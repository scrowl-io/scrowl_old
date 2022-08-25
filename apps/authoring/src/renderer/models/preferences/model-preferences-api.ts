import { requester } from '../../services';
import {
  PreferenceData,
  PreferenceEventApi,
} from '../../../main/models/preferences';

const ENDPOINTS: PreferenceEventApi = {
  create: '/preferences/create',
  get: '/preferences',
  save: '/preferences/save',
  open: '/preferences/open',
  systemUpdate: '/preferences/systemUpdate',
};

export const ENDPOINTS_PREFERENCES = ENDPOINTS;

export const get = () => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.get).then(resolve);
    } catch (e) {
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

export const update = (data: PreferenceData) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.save, data).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to update preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const systemUpdate = (data: PreferenceData) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.systemUpdate, data).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to update preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

export default {
  ENDPOINTS_PREFERENCES,
};
