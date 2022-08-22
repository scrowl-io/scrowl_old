import { Model } from '../model.types';
import { TemplateEvents } from './model-templates.types';
import { InternalStorage as IS, Requester } from '../../services';
import * as table from './model-templates-schema';

export const importTemplate = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      resolve({
        error: false,
        data: {
          template: {
            name: 'Example Template',
          },
        },
      });
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

export const list = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      resolve({
        error: false,
        data: {
          items: [
            {
              name: 'Example Template',
            },
          ],
        },
      });
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
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      resolve({
        error: false,
        data: {
          template: {
            name: 'Example Template',
          },
        },
      });
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

export const EVENTS: TemplateEvents = {
  import: {
    name: '/templates/import',
    type: 'invoke',
    fn: importTemplate,
  },
  open: {
    name: '/templates/open',
    type: 'send',
  },
  list: {
    name: '/templates/list',
    type: 'invoke',
    fn: list,
  },
  load: {
    name: '/templates/load',
    type: 'invoke',
    fn: load,
  },
};

export const init = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      Requester.registerAll(EVENTS);
      IS.__tableCreate(table.name, table.schema).then(() => {
        resolve({
          error: false,
          data: {
            table: table.name,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to initialize template model',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const Templates: Model = {
  EVENTS,
  init,
  importTemplate,
  list,
  load,
};

export default Templates;
