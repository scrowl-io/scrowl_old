import path from 'path';
import fs from 'fs-extra';
import packager from 'scorm-packager';
import {
  PathingProps,
  PathingDirKey,
  PublisherEvents,
} from './service-publisher.types';
import { ProjectData } from '../../models/projects/model-projects.types';
import { registerAll, ApiResult } from '../requester';
import {
  pathTempFolder,
  join,
  copy,
  readFile,
  writeFile,
} from '../file-system';
import { compile } from '../templater';
import { ProjectConfig } from '@scrowl/player/src/lib';

const pathing: PathingProps = {
  files: {
    template: {
      source: path.join(__dirname, 'project/templates/index.hbs'),
      dest: path.join(__dirname, 'project/package/content/index.html'),
    },
  },
  dirs: {
    source: path.join(__dirname, 'project/package'),
    out: path.join(__dirname, 'project/dist'),
  },
};

const setPathingDirs = () => {
  let dest = '' as PathingDirKey;

  for (dest in pathing.dirs) {
    if (!fs.existsSync(pathing.dirs[dest])) {
      fs.mkdirSync(pathing.dirs[dest]);
    }
  }
};

const createScormSource = (source: string, dist: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const templatesPath = join(__dirname, 'project', 'package', 'content');
      const dest = join(dist, 'content');
      const opts = {
        filter: (src: string) => {
          return src.indexOf('manifest.json') === -1;
        },
      };

      copy(source, dest, opts).then(copyRes => {
        if (copyRes.error) {
          resolve(copyRes);
          return;
        }

        copy(templatesPath, dest).then(resolve);
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm source files',
        data: {
          trace: e,
          dist,
          source,
        },
      });
    }
  });
};

const createScormEntry = (source: string, dest: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const manifestSource = join(source, 'manifest.json');
      readFile(manifestSource).then(readManifest => {
        if (readManifest.error) {
          resolve(readManifest);
          return;
        }

        const manifest = readManifest.data.contents;
        const entrySource = join(
          __dirname,
          'project',
          'templates',
          'index.hbs'
        );

        readFile(entrySource).then(readEntry => {
          if (readEntry.error) {
            resolve(readEntry);
            return;
          }

          const entryRes = compile(readEntry.data.contents, {
            manifest: JSON.stringify(manifest),
          });

          if (entryRes.error) {
            resolve(entryRes);
            return;
          }

          const entryDest = join(dest, 'content', 'index.html');
          const entryFile = entryRes.data.contents;

          writeFile(entryDest, entryFile).then(resolve);
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

const createScormPackage = (tempPath: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      // package scorm to downloads folder
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm package',
        data: {
          trace: e,
          path: tempPath,
        },
      });
    }
  });
};

export const pack = (project: ProjectData) => {
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
      console.log('paths', source, dest);
      createScormSource(source, dest).then(sourceRes => {
        if (sourceRes.error) {
          resolve(sourceRes);
          return;
        }

        createScormEntry(source, dest).then(entryRes => {
          if (entryRes.error) {
            resolve(entryRes);
            return;
          }

          resolve({
            error: false,
            data: {
              project,
            },
          });
          // createScormPackage(tempPath).then(resolve);
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

// export const pack = (
//   ev: Electron.IpcMainInvokeEvent,
//   packOptions: {
//     title?: string;
//     manifest?: ProjectConfig;
//   }
// ) => {
//   return new Promise((resolve, reject) => {
//     const config = {
//       version: '1.2',
//       organization: 'OSG',
//       language: 'en-US',
//       startingPage: 'content/index.html',
//       source: pathing.dirs.source,
//       package: {
//         version: '0.0.1',
//         zip: true,
//         outputFolder: pathing.dirs.out,
//       },
//     };
//     const projectTemplate = fileReadSync(pathing.files.template.source);

//     if (projectTemplate.error) {
//       reject(projectTemplate);
//       return;
//     }

//     if (!packOptions.manifest) {
//       reject({
//         error: true,
//         message: 'Missing project manifest',
//       });
//       return;
//     }

//     const projectData = {
//       title: packOptions.title ? packOptions.title : '',
//       manifest: JSON.stringify(packOptions.manifest),
//     };
//     const projectContents = compile(projectTemplate.data.contents, projectData);

//     if (projectContents.error) {
//       reject(projectContents);
//       return;
//     }

//     const writeRes = fileWriteSync(
//       pathing.files.template.dest,
//       projectContents.data.contents
//     );

//     if (writeRes.error) {
//       reject(writeRes);
//       return;
//     }

//     setPathingDirs();
//     packager(config, (msg: string) => {
//       resolve({
//         error: false,
//         message: msg,
//       });
//     });
//   });
// };

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
