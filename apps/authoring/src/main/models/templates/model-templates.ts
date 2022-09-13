import { Model } from '../model.types';
import { TemplateEvents } from './model-templates.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Requester,
} from '../../services';
import * as table from './model-templates-schema';

export const templateFolderPath = fs.join(fs.pathSaveFolder, 'templates');

export const add = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      const dialogOptions = {
        title: 'Scrowl - Import Template',
        showHiddenFiles: false,
        filters: [
          {
            name: 'Archive',
            extensions: ['zip'],
          },
        ],
      };
      fs.dialogOpen(dialogOptions).then(openRes => {
        if (openRes.error) {
          resolve({
            error: true,
            message: openRes.message,
            data: openRes.data,
          });
          return;
        }

        if (openRes.data.canceled) {
          resolve({
            error: false,
            data: {
              canceled: true,
            },
          });
          return;
        }

        const source = openRes.data.filePaths[0];
        const filename = fs.basename(source, '.zip');
        const dest = fs.join(templateFolderPath, filename);

        fs.unarchive(source, dest).then(archiveRes => {
          if (archiveRes.error) {
            resolve({
              error: true,
              message: archiveRes.message,
              data: archiveRes.data,
            });
            return;
          }

          resolve({
            error: false,
            data: {
              canceled: false,
              source,
              dest,
            },
          });
        });
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
