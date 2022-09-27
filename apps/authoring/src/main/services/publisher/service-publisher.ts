import packager from 'scorm-packager';
import { Templates, Project } from '../../models';
import {
  PublisherEvents,
  TemplateInfo,
  TemplateCopyResult,
} from './service-publisher.types';
import { registerAll, ApiResult } from '../requester';
import { compile } from '../templater';
import {
  pathTempFolder,
  pathDownloadsFolder,
  getAssetPath,
  join,
  copy,
  readFile,
  writeFile,
} from '../file-system';

export const assetPath = getAssetPath(join('assets'));

const getTemplateList = (project: Project.ProjectData) => {
  if (!project.modules || !project.modules.length) {
    return;
  }

  const names: Array<string> = [];
  const list: Array<Templates.TemplateManifestMeta> = [];

  project.modules.forEach(module => {
    if (!module.lessons || !module.lessons.length) {
      return;
    }

    module.lessons.forEach(lesson => {
      if (!lesson.slides || !lesson.slides.length) {
        return;
      }

      lesson.slides.forEach(slide => {
        if (!slide.template) {
          return;
        }

        if (names.indexOf(slide.template.meta.filename) !== -1) {
          return;
        }

        names.push(slide.template.meta.filename);
        list.push(slide.template.meta);
      });
    });
  });

  return list;
};

const getTemplateInfo = (project: Project.ProjectData) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const templates = getTemplateList(project);

      if (!templates || !templates.length) {
        resolve({
          error: true,
          message: 'failed to add templates: no templates found',
          data: {
            project,
          },
        });
        return;
      }

      const urlReqs = templates.map(meta => {
        return Templates.locate(meta.filename);
      });

      Promise.allSettled(urlReqs).then(urlRes => {
        const info: Array<TemplateInfo> = [];
        let isError = false;
        let errorRes: unknown;

        urlRes.forEach((res, idx: number) => {
          if (isError) {
            return;
          }

          if (res.status === 'rejected') {
            isError = true;
            return;
          }

          if (res.value.error) {
            isError = true;
            errorRes = res.value;
            return;
          }

          info.push(
            Object.assign(
              {
                pathname: res.value.data.pathname,
              },
              templates[idx]
            )
          );
        });

        if (isError) {
          resolve({
            error: true,
            message: 'failed to locate templates',
            data: {
              trace: errorRes,
              templates,
              project,
            },
          });
          return;
        }

        resolve({
          error: false,
          data: {
            info,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'failed to add templates to publishing',
        data: {
          trace: e,
        },
      });
    }
  });
};

const copyTemplates = (templates: Array<TemplateInfo>, to: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const copyOpts = {
        filter: (src: string) => {
          return src.indexOf('manifest.json') === -1;
        },
      };
      const copyReqs = templates.map(info => {
        return copy(info.pathname, join(to, info.filename), copyOpts);
      });

      Promise.allSettled(copyReqs).then(copyRes => {
        let isError = false;
        let errorRes: unknown;

        copyRes.forEach(res => {
          if (res.status === 'rejected') {
            isError = true;
            return;
          }

          if (res.value.error) {
            isError = true;
            errorRes = res.value;
            return;
          }
        });

        if (isError) {
          resolve({
            error: true,
            message: 'failed to locate templates',
            data: {
              trace: errorRes,
              templates,
              to,
            },
          });
          return;
        }

        resolve({
          error: false,
          data: {
            templates,
            to,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'failed to copy templates',
        data: {
          trace: e,
        },
      });
    }
  });
};

const createScormSource = (
  from: string,
  to: string,
  project: Project.ProjectData
) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const manifestPath = join(from, 'manifest.json');
      const manifestDest = join(to, 'content', 'manifest.json');
      const scormPath = join(assetPath, 'workspace');
      const scormDest = join(to, 'content');
      const scormPathOpts = {
        filter: (source: string) => {
          return source.indexOf('.hbs') === -1;
        },
      };
      const templateDest = join(to, 'content', 'templates');

      copy(manifestPath, manifestDest).then(manifestCopyRes => {
        if (manifestCopyRes.error) {
          resolve(manifestCopyRes);
          return;
        }

        copy(scormPath, scormDest, scormPathOpts).then(scormCopyRes => {
          if (scormCopyRes.error) {
            resolve(scormCopyRes);
            return;
          }

          getTemplateInfo(project).then(infoRes => {
            if (infoRes.error) {
              resolve(infoRes);
              return;
            }

            copyTemplates(infoRes.data.info, templateDest).then(resolve);
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm source files',
        data: {
          trace: e,
          to,
          from,
        },
      });
    }
  });
};

const createScormEntry = (
  source: string,
  dest: string,
  templateInfo: TemplateCopyResult
) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const manifestSource = join(source, 'manifest.json');
      readFile(manifestSource).then(readManifest => {
        if (readManifest.error) {
          resolve(readManifest);
          return;
        }

        const manifest = readManifest.data.contents;
        const sources = [
          {
            pathname: join(assetPath, 'workspace', 'scorm.html.hbs'),
            dest: join(dest, 'content', 'index.html'),
            compile: true,
          },
          {
            pathname: join(assetPath, 'workspace', 'scorm.js.hbs'),
            dest: join(dest, 'content', 'index.js'),
            compile: true,
          },
        ];
        const templateRelativePath = `./templates`;
        const templateMap = templateInfo.templates.map(template => {
          return {
            js: `${templateRelativePath}/${template.filename}/template-${template.filename}.js`,
            css: `${templateRelativePath}/${template.filename}/template-${template.filename}.css`,
            component: template.component,
          };
        });
        const importList = {
          react: `./shim-react.js`,
          'react-dom': `./shim-react-dom.js`,
          'react/jsx-runtime': `./react-jsx-runtime.development.js`,
          'react-router-dom': './shim-react-router-dom.js',
          'react-bootstrap': `./shim-react-bootstrap.js`,
          '@owlui/lib': `./owl.lib.module.js`,
          'scrowl-player': './scrowl.player.js',
        };
        const data = {
          appJs: `./index.js`,
          manifest: JSON.stringify(manifest),
          templates: templateMap,
          importList: JSON.stringify(importList),
        };
        const appFileWrites = sources.map(source => {
          return new Promise<ApiResult>(resolve => {
            readFile(source.pathname).then(readRes => {
              if (readRes.error) {
                resolve(readRes);
                return;
              }

              let contents;

              if (source.compile) {
                const compileRes = compile(readRes.data.contents, data);

                if (compileRes.error) {
                  resolve(compileRes);
                  return;
                }

                contents = compileRes.data.contents;
              } else {
                contents = readRes.data.contents;
              }

              writeFile(source.dest, contents).then(resolve);
            });
          });
        });

        Promise.allSettled(appFileWrites).then(writeRes => {
          let isWritten = true;
          let errorRes;

          writeRes.forEach(res => {
            if (!isWritten) {
              return;
            }

            if (res.status === 'rejected') {
              isWritten = false;
              errorRes = res;
              return;
            }

            if (res.value.error) {
              isWritten = false;
              errorRes = res.value;
              return;
            }
          });

          if (!isWritten) {
            resolve({
              error: true,
              message: `Failed to write app files`,
              data: {
                trace: errorRes,
              },
            });
            return;
          }

          resolve({
            error: false,
            data: {
              sources,
              data,
            },
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm entry',
        data: {
          trace: e,
          source,
          dest,
        },
      });
    }
  });
};

const toScormCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const createScormPackage = (
  source: string,
  dest: string,
  config: Project.ProjectData
) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const opts = {
        version: '1.2',
        language: 'en-US',
        startingPage: 'content/index.html',
        source: source,
        package: {
          name: toScormCase(config?.name || ''),
          // Without the publish drawing these fields will not be populated
          // author: config?.scormConfig?.authors,
          // description: config?.scormConfig?.description,
          zip: true,
          outputFolder: dest,
        },
      };

      packager(opts, (message: string) => {
        resolve({
          error: false,
          data: {
            message,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm package',
        data: {
          trace: e,
          path: source,
          config,
        },
      });
    }
  });
};

export const pack = (project: Project.ProjectData, zipDest: string) => {
  return new Promise<ApiResult>(resolve => {
    if (!project || !project.id) {
      resolve({
        error: true,
        message: 'Unable to publish project: project data required',
      });
      return;
    }

    try {
      const source = join(pathTempFolder, project.id.toString());
      const dest = join(pathTempFolder, 'dist');

      createScormSource(source, dest, project).then(sourceRes => {
        if (sourceRes.error) {
          resolve(sourceRes);
          return;
        }

        const sourceData = sourceRes.data as TemplateCopyResult;

        createScormEntry(source, dest, sourceData).then(entryRes => {
          if (entryRes.error) {
            resolve(entryRes);
            return;
          }

          createScormPackage(dest, zipDest, project).then(resolve);
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to publish project',
        data: {
          trace: e,
          project,
        },
      });
    }
  });
};

export const EVENTS: PublisherEvents = {
  package: {
    name: 'publish-project',
    type: 'invoke',
    fn: pack,
  },
};

export const init = () => {
  registerAll(EVENTS);
};

export default {
  EVENTS,
  init,
  pack,
};
