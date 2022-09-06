import { Model } from '../model.types';
import { TemplateEvents } from './model-templates.types';
import { InternalStorage as IS, Requester } from '../../services';
import * as table from './model-templates-schema';

export const add = () => {
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
        message: 'Failed to add template',
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
  add: {
    name: '/templates/add', // sends menu event to frontend
    type: 'send',
  },
  onAdd: {
    name: '/templates/add', // allows user to add/import/install a new template
    type: 'invoke',
    fn: add,
  },
  open: {
    name: '/templates/open', // sends menu event to open the explorer modal
    type: 'send',
  },
  list: {
    name: '/templates/list', // gets list of templates
    type: 'invoke',
    fn: list,
  },
  load: {
    name: '/templates/load', // makes template available to canvas
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
  add,
  list,
  load,
};

export default Templates;
