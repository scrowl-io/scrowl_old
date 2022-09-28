import { TemplateEventApi } from '../../../main/models/templates';
import { TemplateManifest } from './model-templates.types';
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
  console.log('[template api] listing - start');
  return new Promise<requester.ApiResult>(resolve => {
    try {
      console.log('[template api] listing - calling');
      requester
        .invoke(ENDPOINTS.list, limit)
        .then(resolve)
        .catch(e => {
          console.log('[template api] listing - error', e);
          resolve({
            error: true,
            message: 'Failed to list templates',
            data: {
              trace: e,
            },
          });
        });
    } catch (e) {
      console.log('[template api] listing - error', e);
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

export const load = (templateManifest: TemplateManifest) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.load, templateManifest).then(resolve);
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
