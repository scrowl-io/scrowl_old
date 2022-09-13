import { TemplateEventApi } from '../../../main/models/templates';
import { requester } from '../../services';

const ENDPOINTS: TemplateEventApi = {
  add: '/templates/add',
  open: '/templates/open',
  list: '/templates/list',
  load: '/templates/load',
};

export const add = () => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.add).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to import template',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const list = (limit?: number) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.list, limit).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to list templates',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const load = () => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.load).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to load template',
        data: {
          trace: e,
        },
      });
    }
  });
};

export default {
  ENDPOINTS,
  add,
  list,
  load,
};
