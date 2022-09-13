import { Model } from '../model.types';
import { TemplateEvents, TemplateRecords } from './model-templates.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Requester,
} from '../../services';
import * as table from './model-templates-schema';
import { requester } from '../../../renderer/services';

export const templateFolderPath = fs.join(fs.pathSaveFolder, 'templates');
export const templateAssetPath = fs.getAssetPath(
  fs.join('models', 'templates', 'assets')
);

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
  const isDir = (file: fs.Dirent) => {
    return file.isDirectory();
  };

  const templateRecord = (file: fs.Dirent, pathname: string) => {
    return new Promise<requester.ApiResult>(resolve => {
      try {
        const source = fs.join(pathname, file.name, 'manifest.json');

        fs.readFile(source).then(readRes => {
          if (readRes.error) {
            resolve(readRes);
            return;
          }

          resolve({
            error: false,
            data: {
              name: file.name,
              source,
              manifest: readRes.data.contents,
            },
          });
        });
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to get template info',
          data: {
            trace: e,
          },
        });
      }
    });
  };
  const getTemplateRecords = (pathname: string) => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        fs.readDir(pathname).then(readRes => {
          if (readRes.error) {
            resolve(readRes);
            return;
          }

          const templateList = readRes.data.files
            .filter(isDir)
            .map((file: fs.Dirent) => {
              return templateRecord(file, pathname);
            });

          Promise.allSettled(templateList).then(listRes => {
            const templates: TemplateRecords = [];

            listRes.forEach(res => {
              if (res.status === 'rejected') {
                console.error('Failed to get template record', res);
                return;
              }

              if (res.value.error) {
                console.warn('Unable to get template record', res);
                return;
              }

              templates.push(res.value.data);
            });

            resolve({
              error: false,
              data: {
                templates,
              },
            });
          });
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

  return new Promise<Requester.ApiResult>(resolve => {
    try {
      const recordPromises = [
        getTemplateRecords(templateFolderPath),
        getTemplateRecords(templateAssetPath),
      ];

      Promise.allSettled(recordPromises).then(resPromises => {
        let templates: TemplateRecords = [];

        resPromises.forEach(res => {
          if (res.status === 'rejected') {
            console.error('Failed to get template record', res);
            return;
          }

          if (res.value.error) {
            console.warn('Unable to get template record', res);
            return;
          }

          templates = templates.concat(res.value.data.templates);
        });

        resolve({
          error: false,
          data: {
            templates,
          },
        });
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
