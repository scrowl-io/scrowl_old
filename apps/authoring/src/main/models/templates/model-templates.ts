import { Model } from '../model.types';
import { TemplateEvents, TemplateRecords } from './model-templates.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Requester,
  Logger,
  Templater,
} from '../../services';
import * as table from './model-templates-schema';
import { requester } from '../../../renderer/services';

export const templateFolderPath = fs.join(fs.pathSaveFolder, 'templates');
export const templateWorkingPath = fs.join(fs.pathTempFolder, 'templates');
export const templateAssetPath = fs.getAssetPath(
  fs.join('models', 'templates', 'assets')
);

export const install = () => {
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
            Logger.error(readRes);
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
            Logger.warn(readRes);
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
                Logger.error('Failed to get template record', res);
                return;
              }

              if (res.value.error) {
                Logger.warn('Unable to get template record', res);
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
        const msg = `Failed to list templates: ${pathname}`;

        Logger.error(msg, e);
        resolve({
          error: true,
          message: msg,
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
      Logger.error('Failed to list templates', e);
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
      const base = fs.join(templateAssetPath, 'workspace', 'canvas.hbs');

      fs.readFile(base).then(readRes => {
        if (readRes.error) {
          resolve(readRes);
          return;
        }

        const compileRes = Templater.compile(readRes.data.contents, {
          manifest: JSON.stringify({ foo: 'bar' }),
        });

        if (compileRes.error) {
          resolve(compileRes);
          return;
        }

        Logger.info(`loading template: ${base}`);
        resolve({
          error: false,
          data: {
            template: compileRes.data.contents,
          },
        });
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

export const add = (
  ev: Requester.RequestEvent | undefined,
  templateName: string,
  projectId: string | number,
  dest: 'save' | 'temp' = 'temp'
) => {
  const templatePath = `template-${templateName}`;
  const getDestFolderPath = (start: string) => {
    return fs.join(
      start,
      projectId.toString(),
      'content',
      'templates',
      templatePath
    );
  };
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      if (!templateName) {
        resolve({
          error: true,
          message: `Unable to add template to project (${projectId}): template required`,
        });
        return;
      }

      if (!projectId) {
        resolve({
          error: true,
          message: `Unable to add template (${templateName}) to project: project required`,
        });
        return;
      }

      const sourceFolder = fs.join(templateAssetPath, templatePath);
      const sourceManifest = fs.join(sourceFolder, 'manifest.json');

      fs.existsFile(sourceManifest).then(existsRes => {
        if (existsRes.error) {
          resolve(existsRes);
          return;
        }

        if (!existsRes.data.exists) {
          resolve({
            error: true,
            message: `Unable to add template: template does not exist - ${templateName}`,
          });
          return;
        }

        let destFolder = '';

        switch (dest) {
          case 'save':
            destFolder = getDestFolderPath(fs.pathSaveFolder);
            break;
          case 'temp':
            destFolder = getDestFolderPath(fs.pathTempFolder);
            break;
        }

        fs.copy(sourceFolder, destFolder)
          .then(copyRes => {
            if (copyRes.error) {
              resolve(copyRes);
              return;
            }

            resolve({
              error: false,
              data: {
                templateName,
                projectId,
                source: sourceFolder,
                dest: destFolder,
              },
            });
          })
          .catch(e => {
            resolve({
              error: true,
              message: `Failed to add template (${templateName}) to project (${projectId})`,
              data: {
                trace: e,
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

export const EVENTS: TemplateEvents = {
  install: {
    name: '/templates/install', // sends menu event to frontend
    type: 'send',
  },
  onInstall: {
    name: '/templates/install', // allows user to add/import/install a new template
    type: 'invoke',
    fn: install,
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
  install,
  list,
  load,
  add,
};

export default Templates;
