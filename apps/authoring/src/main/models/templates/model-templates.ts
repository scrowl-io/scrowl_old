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

export const load = (ev: Requester.RequestEvent, templateName: string) => {
  const templateBase = `template-${templateName}`;

  const copyTemplateComponent = () => {
    return new Promise<Requester.ApiResult>(resolve => {
      const templateFolder = fs.join(templateAssetPath, templateBase);
      const dest = fs.join(templateWorkingPath, 'src');

      fs.existsFile(templateFolder)
        .then(existRes => {
          if (existRes.error) {
            resolve(existRes);
            return;
          }

          if (!existRes.data.exists) {
            resolve({
              error: true,
              message: 'unable to load template: template does not exist',
            });
            return;
          }

          fs.copy(templateFolder, dest)
            .then(resolve)
            .catch(e => {
              resolve({
                error: true,
                message: 'failed to copy template',
                data: {
                  trace: e,
                },
              });
            });
        })
        .catch(e => {
          resolve({
            error: true,
            message: 'failed to copy template',
            data: {
              trace: e,
            },
          });
        });
    });
  };
  const compileCanvas = (
    filename: string,
    data: { [key: string]: string | { [key: string]: string } },
    dest: string
  ) => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        fs.readFile(filename).then(readRes => {
          if (readRes.error) {
            resolve(readRes);
            return;
          }

          const compileRes = Templater.compile(readRes.data.contents, data);

          if (compileRes.error) {
            resolve(compileRes);
            return;
          }

          fs.writeFileTemp(dest, compileRes.data.contents).then(resolve);
        });
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to compile canvas',
          data: {
            trace: e,
          },
        });
      }
    });
  };

  return new Promise<Requester.ApiResult>(resolve => {
    try {
      if (!templateName) {
        resolve({
          error: true,
          message: `Unable to load template: template required`,
        });
        return;
      }
      const filenameReact = 'react.development.js';
      const reactSource = fs.join(
        templateAssetPath,
        'workspace',
        filenameReact
      );
      const reactDest = fs.join(
        templateWorkingPath,
        'src',
        filenameReact
      );
      const filenameReactDom = 'react-dom.development.js';
      const reactDomSource = fs.join(
        templateAssetPath,
        'workspace',
        filenameReactDom
      );
      const reactDomDest = fs.join(
        templateWorkingPath,
        'src',
        filenameReactDom
      );
      const filenameReactJsx = 'react-jsx-runtime.development.js';
      const reactJsxSource = fs.join(
        templateAssetPath,
        'workspace',
        filenameReactJsx
      );
      const reactJsxDest = fs.join(
        templateWorkingPath,
        'src',
        filenameReactJsx
      );
      const canvasHtmlSource = fs.join(
        templateAssetPath,
        'workspace',
        'canvas.html.hbs'
      );
      const canvasHtmlDest = fs.join('templates', 'src', 'canvas.html');
      const canvasScriptSource = fs.join(
        templateAssetPath,
        'workspace',
        'canvas.js.hbs'
      );
      const canvasScriptDest = fs.join('templates', 'src', 'canvas.js');
      const data = {
        templateJs: `./${templateBase}.js`,
        templateCss: `./${templateBase}.css`,
        templateComponent: '',
        manifest: JSON.stringify({
          foo: 'bar',
        }),
        importList: JSON.stringify({
          react: `./${filenameReact}`,
          'react-dom': `./${filenameReactDom}`,
          'react/jsx-runtime': `./${filenameReactJsx}`,
        }),
      };
      const canvasRendering = [
        fs.copy(reactSource, reactDest),
        fs.copy(reactDomSource, reactDomDest),
        fs.copy(reactJsxSource, reactJsxDest),
        copyTemplateComponent(),
        compileCanvas(canvasHtmlSource, data, canvasHtmlDest),
        compileCanvas(canvasScriptSource, data, canvasScriptDest),
      ];

      Promise.allSettled(canvasRendering).then(renderingRes => {
        let isRendered = true;

        for (let i = 0, ii = renderingRes.length; i < ii; i++) {
          if (renderingRes[i].status === 'rejected') {
            isRendered = false;
            Logger.error('Failed to render canvas');
            break;
          }
        }

        if (!isRendered) {
          resolve({
            error: true,
            message: 'Failed to render canvas',
          });
          return;
        }

        resolve({
          error: false,
          data: {
            url: Requester.templateServerUrl,
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
