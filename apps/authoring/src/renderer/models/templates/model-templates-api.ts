import { TemplateEventApi } from '../../../main/models/templates';
import { requester } from '../../services';

const ENDPOINTS: TemplateEventApi = {
  install: '/templates/install',
  open: '/templates/open',
  list: '/templates/list',
  load: '/templates/load',
};

export const install = () => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.install).then(resolve);
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

export const load = (template: string) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.load, template).then(resolve);
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
  install,
  list,
  load,
};
